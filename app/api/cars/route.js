import { MongoClient } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { verifyUserToken } from "../../lib/auth";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const uploadDir = path.join(process.cwd(), "public", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req) {
  try {
    const userData = await verifyUserToken(req);

    if ("error" in userData) {
      return NextResponse.json(
        { error: userData.error },
        { status: userData.status },
      );
    }

    if (!userData.id) {
      return NextResponse.json(
        { error: "Invalid user data: No user ID" },
        { status: 400 },
      );
    }

    const formData = await req.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const images = formData.getAll("image");
    if (images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 },
      );
    }

    const imageUrls = [];
    for (const image of images) {
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await image.arrayBuffer());
      await fs.promises.writeFile(filePath, buffer);
      imageUrls.push(`/uploads/${fileName}`);
    }

    const carData = {
      ...formEntries,
      features: JSON.parse(formEntries.features || "[]"),
      imageUrls,
      userId: userData.id,
      createdAt: new Date(),
    };

    await client.connect();
    const db = client.db("cardealor");
    const result = await db.collection("cars").insertOne(carData);

    return NextResponse.json(
      {
        message: "Car added successfully",
        data: { ...carData, _id: result.insertedId },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to add car", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}

export async function GET() {
  try {
    await client.connect();
    const db = client.db("cardealor");

    const cars = await db.collection("cars").find({}).toArray();
    const dealerLocations = await db
      .collection("dealerLocations")
      .find({})
      .toArray();

    const carsWithDealerInfo = cars.map((car) => {
      const dealerInfo = dealerLocations.find(
        (dealer) => dealer.id === car.dealerId,
      );
      return {
        ...car,
        dealerInfo,
      };
    });

    return NextResponse.json({ cars: carsWithDealerInfo });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}
