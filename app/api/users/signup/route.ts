export const dynamic = 'force-dynamic'
import connectToMongoDB from "../../../lib/mongodb";
import User from "../../../models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectToMongoDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, role, pin } = reqBody;

    if (!email || !password || !role || !pin) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    if (!["user", "superadmin"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    const pinRegex = /^\d{4,6}$/;
    if (!pinRegex.test(pin)) {
      return NextResponse.json(
        { error: "PIN must be 4-6 digits" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    const passwordSalt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, passwordSalt);

    const pinSalt = await bcryptjs.genSalt(10);
    const hashedPin = await bcryptjs.hash(pin, pinSalt);

    const newUser = new User({
      email,
      username: email.split("@")[0], 
      password: hashedPassword,
      role,
      pin: hashedPin,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully!",
      success: true,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error: any) {
    console.error("Signup Error:", error);

    if (error.code === 11000) {
  const key = error.keyPattern ? Object.keys(error.keyPattern)[0] : 'Field';
  return NextResponse.json(
    { error: `${key.charAt(0).toUpperCase() + key.slice(1)} already exists` },
    { status: 409 }
  );
}

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}