export const dynamic = 'force-dynamic'
import connectToMongoDB from "../../../lib/mongodb";
import User from "../../../models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { SignJWT } from "jose";

connectToMongoDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("Received Request Body:", reqBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist in DB" },
        { status: 400 },
      );
    }
    console.log("User Found in DB:", user);

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    console.log("Token Data Before Signing:", tokenData);

    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
    const token = await new SignJWT(tokenData)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2d")
      .sign(secret);

    console.log("Generated Token:", token);

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      token,
      role: user.role,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error: any) {
    console.error("Error in Login API:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
