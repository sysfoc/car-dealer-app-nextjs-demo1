import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Blog from "../../../models/Blog";
import path from "path";
import fs from "fs/promises";
const uploadDir = path.join(process.cwd(), "public/uploads");
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const formData = await request.formData();

    const slug = formData.get("slug");
    const metaTitle = formData.get("metaTitle");
    const metaDescription = formData.get("metaDescription");
    const h1 = formData.get("h1");
    const content = formData.get("content");
    const categoryId = formData.get("categoryId");
    const image = formData.get("image");

    let updatedData = {
      slug,
      metaTitle,
      metaDescription,
      h1,
      content,
      categoryId,
    };

    if (image) {
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await image.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      updatedData.image = `/uploads/${fileName}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return NextResponse.json(
      { message: "Blog updated successfully!", blog: updatedBlog },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 },
    );
  }
}

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching blog" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    await Blog.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
