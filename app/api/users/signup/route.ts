export const dynamic = 'force-dynamic'
import connectToMongoDB from "../../../lib/mongodb";
import User from "../../../models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectToMongoDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });


    
    if (existingUser) {
      const conflictField = existingUser.email === email ? "Email" : "Username";
      return NextResponse.json(
        { error: `${conflictField} already exists` },
        { status: 409 },
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully!",
      success: true,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (error: any) {
    console.error("Signup Error:", error);

    if (error.name === "MongoServerError" && error.code === 11000) {
      const key = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        {
          error: `${key.charAt(0).toUpperCase() + key.slice(1)} already exists`,
        },
        { status: 409 },
      );
    }

    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
