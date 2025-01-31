import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const uploadDir = path.join(process.cwd(), "public", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function PATCH(req, { params }) {
  const { id } = params;

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid car ID" }, { status: 400 });
    }

    const formData = await req.formData();
    const formEntries = Object.fromEntries(formData.entries());
    //  console.log("Form Data Received:", formEntries);

    let features = [];
    if (formEntries.features) {
      try {
        features = JSON.parse(formEntries.features);
      } catch (error) {
        console.error("Failed to parse features:", error);
        return NextResponse.json(
          { error: "Invalid features format" },
          { status: 400 },
        );
      }
    }

    let imageUrls = [];
    const images = formData.getAll("images");

    if (images && images.length > 0) {
      for (const image of images) {
        if (image instanceof File) {
          const fileName = `${Date.now()}-${image.name}`;
          const filePath = path.join(uploadDir, fileName);

          const buffer = Buffer.from(await image.arrayBuffer());
          await fs.promises.writeFile(filePath, buffer);

          imageUrls.push(`/uploads/${fileName}`);
        }
      }
    }

    let videoUrl = null;
    const video = formData.get("video");

    if (video && video.name) {
      const fileName = `${Date.now()}-${video.name}`;
      const filePath = path.join(uploadDir, fileName);

      const buffer = Buffer.from(await video.arrayBuffer());
      await fs.promises.writeFile(filePath, buffer);

      videoUrl = `/uploads/${fileName}`;
    }

    const updatedData = {
      ...formEntries,
      ...(features.length > 0 && { features }),
      ...(imageUrls.length > 0 && { images: imageUrls }),
      ...(videoUrl && { video: videoUrl }),
    };

    delete updatedData._id;

    console.log("Updated Data to Insert:", updatedData);

    await client.connect();
    const db = client.db("cardealor");

    const result = await db
      .collection("cars")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "No changes made or car not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Car updated successfully", updatedData },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to update car", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid car ID" }, { status: 400 });
    }

    await client.connect();
    const db = client.db("cardealor");

    const car = await db.collection("cars").findOne({ _id: new ObjectId(id) });
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    await db.collection("cars").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json(
      { message: "Car deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to delete car", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}

export async function GET(req, { params }) {
  const { id } = params;

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid car ID" }, { status: 400 });
    }

    await client.connect();
    const db = client.db("cardealor");

    const car = await db.collection("cars").findOne({ _id: new ObjectId(id) });
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ car }, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to fetch car", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}
