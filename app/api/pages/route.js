import connectDB from "../../lib/mongodb";
import { NextResponse } from "next/server";
import PageContent from "../../models/PageContent.js";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!type) {
    return NextResponse.json({ error: "Missing type" }, { status: 400 });
  }

  const data = await PageContent.findOne({ type });
  return NextResponse.json({ data });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { type, name, content } = body;

  if (!type || !name || !content) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 },
    );
  }

  const existing = await PageContent.findOne({ type });
  let result;

  if (existing) {
    existing.name = name;
    existing.content = content;
    result = await existing.save();
  } else {
    result = await PageContent.create({ type, name, content });
  }

  return NextResponse.json({ message: "Saved successfully", data: result });
}
