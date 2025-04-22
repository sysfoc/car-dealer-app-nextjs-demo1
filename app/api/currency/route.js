import dbConnect from "@/app/lib/mongodb";
import Currency from "../../models/Currency";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const currencies = await Currency.find();
  return NextResponse.json(currencies);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const newCurrency = await Currency.create(body);
  return NextResponse.json(newCurrency, { status: 201 });
}
