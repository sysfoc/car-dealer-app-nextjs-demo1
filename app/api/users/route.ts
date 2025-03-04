import { NextResponse } from "next/server";

import connectToMongoDB from "../../lib/mongodb";
import User from "../../models/User";

export async function GET(req: Request) {
  await connectToMongoDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  try {
    const users = await User.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .select("name email password");
    console.log(users);

    const totalUsers = await User.countDocuments();

    return NextResponse.json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 },
    );
  }
}
