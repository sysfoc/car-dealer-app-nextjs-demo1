import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Currency from "@/app/models/Currency";

export async function GET() {
  await dbConnect();
  const defaultCurrency = await Currency.findOne({ isDefault: true });

  return NextResponse.json(defaultCurrency);
}
