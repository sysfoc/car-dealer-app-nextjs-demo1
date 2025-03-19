import connectToMongoDB from "../../lib/mongodb";
import { NextResponse } from "next/server";
import { verifyUserToken } from "../../lib/auth";

import path from "path";
import fs from "fs/promises";
import Brand from "../../models/Brand";

export async function GET() {
  const brands = await db.brand.findMany();
  return NextResponse.json(brands);
}
const uploadDir = path.join(process.cwd(), "public/uploads");

connectToMongoDB();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const slug = formData.get("slug");
    const logo = formData.get("logo");

    if (!name || !slug || !logo) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${logo.name}`;
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await logo.arrayBuffer());

    await fs.writeFile(filePath, buffer);

    const logoUrl = `/uploads/${fileName}`;

    const newBrand = new Brand({ name, slug, logo: logoUrl });
    await newBrand.save();

    return NextResponse.json(
      { message: "Brand added successfully!", brand: newBrand },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding brand:", error);
    return NextResponse.json({ error: "Failed to add brand" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const userData = await verifyUserToken(req);
    if ("error" in userData) {
      return NextResponse.json(
        { error: userData.error },
        { status: userData.status },
      );
    }

    if (userData.role !== "superadmin") {
      return NextResponse.json(
        { error: "Access Forbidden: Only superadmin can edit brands" },
        { status: 403 },
      );
    }

    const { id, name, slug, logo } = await req.json();
    const updatedBrand = await db.brand.update({
      where: { id },
      data: { name, slug, logo },
    });
    return NextResponse.json(updatedBrand);
  } catch (error) {
    console.error("Update Brand Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    const userData = await verifyUserToken(req);
    if ("error" in userData) {
      return NextResponse.json(
        { error: userData.error },
        { status: userData.status },
      );
    }

    if (userData.role !== "superadmin") {
      return NextResponse.json(
        { error: "Access Forbidden: Only superadmin can delete brands" },
        { status: 403 },
      );
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Brand ID is required" },
        { status: 400 },
      );
    }

    await db.brand.delete({ where: { id } });
    return NextResponse.json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error("Delete Brand Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
