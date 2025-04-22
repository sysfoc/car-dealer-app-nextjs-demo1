import dbconnect from "../../../lib/mongodb";
import Currency from "../../../models/Currency";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await dbconnect();
  await Currency.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

export async function PUT(req, { params }) {
  await dbconnect();
  const body = await req.json();
  const updated = await Currency.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function GET(req, { params }) {
    await dbconnect();
    try {
      const currency = await Currency.findById(params.id);
      if (!currency) {
        return NextResponse.json({ error: "Currency not found" }, { status: 404 });
      }
      return NextResponse.json(currency, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Invalid ID or server error" }, { status: 500 });
    }
  }
  
