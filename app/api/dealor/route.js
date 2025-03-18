import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import Dealer from "../../models/Dealer";

await connectDB();

export const GET = async () => {
  try {
    const dealers = await Dealer.find();
    return NextResponse.json(dealers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();
    const newDealer = new Dealer(body);
    await newDealer.save();
    return NextResponse.json({ message: "Dealer added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add dealer" },
      { status: 500 },
    );
  }
};
