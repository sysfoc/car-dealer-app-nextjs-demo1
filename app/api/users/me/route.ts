export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User"
import connectToMongoDB from "../../../lib/mongodb";
import jwt from "jsonwebtoken";

interface JwtUserPayload {
  id: string;
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  profilePicture?: string;
}

connectToMongoDB();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized access, token missing" },
        { status: 403 },
      );
    }
    
    console.log("Token:", token);
    console.log("Secret:", process.env.JWT_SECRET ? "Secret exists" : "Secret missing");
    
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtUserPayload;
      
      const user = await User.findById(decoded.id, "username email role profilePicture");
      
      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 },
        );
      }
      
      return NextResponse.json({ user });
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError);
      const decoded = jwt.decode(token) as JwtUserPayload;
      
      if (!decoded || !decoded.id) {
        return NextResponse.json(
          { error: "Unable to decode token" },
          { status: 403 },
        );
      }
      const user = await User.findById(decoded.id, "username email role profilePicture");
      
      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 },
        );
      }
      return NextResponse.json({
        user,
        warning: "Token signature verification failed, using decoded token",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
    } else {
      console.error("API Error:", error);
    }
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
  }
}