// app/api/users/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import User from "../../../models/User";
import connectToMongoDB from "../../../lib/mongodb";

export async function DELETE(request: NextRequest) {
  try {
    await connectToMongoDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    interface JwtPayload {
      id: string;
      role: string;
      [key: string]: any;
    }

    const { role } = payload as JwtPayload;

    if (role !== "superadmin") {
      return NextResponse.json(
        {
          error:
            "Access Forbidden: Staff Account  do not have permission to delete users",
        },
        { status: 403 },
      );
    }

    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.role === "superadmin") {
      return NextResponse.json(
        {
          error:
            "Cannot delete superadmins Account,Contact Support Team SYSFOC ",
        },
        { status: 403 },
      );
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Delete User Error:", error);

    if (error.name === "JWTExpired") {
      return NextResponse.json(
        { error: "Session expired, please login again" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
