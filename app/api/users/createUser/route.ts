// app/api/users/createUser/route.ts (or your chosen path)
import connectToMongoDB from "../../../lib/mongodb";
import User from "../../../models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectToMongoDB();

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let email: string | null = null;
    let password: string | null = null;
    let role: string | null = null;
    let pin: string | null = null;
    let profilePicture: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      email = formData.get("email") as string | null;
      password = formData.get("password") as string | null;
      role = formData.get("role") as string | null;
      pin = formData.get("pin") as string | null;
      profilePicture = formData.get("profilePicture") as File | null;
    } else {
      const reqBody = await request.json();
      email = reqBody.email || null;
      password = reqBody.password || null;
      role = reqBody.role || null;
      pin = reqBody.pin || null;
      profilePicture = reqBody.profilePicture || null; // Usually JSON won't have File, so treat carefully
    }

    // Validate required fields
    if (!email || !password || !role || !pin) {
      return NextResponse.json(
        { error: "All fields (email, password, role, pin) are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Password length validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ["user", "superadmin"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Validate pin (4 to 6 digits)
    const pinRegex = /^\d{4,6}$/;
    if (!pinRegex.test(pin)) {
      return NextResponse.json({ error: "PIN must be 4-6 digits" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    // Hash password
    const passwordSalt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, passwordSalt);

    // Hash pin
    const pinSalt = await bcryptjs.genSalt(10);
    const hashedPin = await bcryptjs.hash(pin, pinSalt);

    // Handle profile picture base64 string or default
    let profilePictureData: string;
    if (
      profilePicture &&
      typeof (profilePicture as any).arrayBuffer === "function"
    ) {
      const bytes = await profilePicture.arrayBuffer();
      const buffer = Buffer.from(bytes);
      profilePictureData = `data:${profilePicture.type};base64,${buffer.toString("base64")}`;
    } else {
      profilePictureData = "/userPicture.jpg";
    }

    // Create new user document
    const newUser = new User({
      email,
      username: email.split("@")[0],
      password: hashedPassword,
      role,
      pin: hashedPin,
      profilePicture: profilePictureData,
    });

    const savedUser = await newUser.save();

    // Return the hashed password and pin so you can copy and insert manually
    return NextResponse.json({
      message: "User created successfully!",
      success: true,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
        role: savedUser.role,
        hashedPassword,
        hashedPin,
      },
    });
  } catch (error: any) {
    console.error("Signup Error:", error);

    if (error.code === 11000) {
      const key = error.keyPattern ? Object.keys(error.keyPattern)[0] : "Field";
      return NextResponse.json(
        { error: `${key.charAt(0).toUpperCase() + key.slice(1)} already exists` },
        { status: 409 }
      );
    }

    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
