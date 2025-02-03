import dbConnect from "../../lib/mongodb";
import User from "../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  const { name, email, password } = await req.json();

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const user = await User.create({ name, email, password });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
