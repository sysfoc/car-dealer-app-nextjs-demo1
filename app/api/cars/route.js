import { MongoClient, ObjectId } from "mongodb";
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

export async function PATCH(req) {
  try {
    await client.connect();
    const db = client.db("cardealor");

    const userData = await verifyUserToken(req);
    if ("error" in userData) {
      return NextResponse.json(
        { error: userData.error },
        { status: userData.status },
      );
    }

    if (userData.role !== "superadmin") {
      return NextResponse.json(
        { error: "Access Denied: Only superadmin can update status" },
        { status: 403 },
      );
    }

    const { carId, status } = await req.json();
    if (!carId || (status !== 0 && status !== 1)) {
      return NextResponse.json(
        { error: "Invalid request: carId and valid status (0 or 1) required" },
        { status: 400 },
      );
    }

    const objectId = new ObjectId(String(carId)); // ✅ Fix: Ensure it's a valid ObjectId

    const result = await db.collection("cars").updateOne(
      { _id: objectId }, // ✅ Fix: Correct ObjectId usage
      { $set: { status } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: `Car ${status === 1 ? "approved" : "unapproved"} successfully`,
    });
  } catch (error) {
    console.error("Error updating car status:", error);
    return NextResponse.json(
      { error: "Failed to update car status", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}

async function generateUniqueSlug(db, make, userId) {
  let slug = make
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let uniqueSlug = `${slug}-${userId}`;
  let count = 1;

  while (await db.collection("cars").findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${userId}-${count}`;
    count++;
  }

  return uniqueSlug;
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
    await client.connect();
    const db = client.db("cardealor");
    const slug = await generateUniqueSlug(db, formEntries.make, userData.id);
    const carData = {
      ...formEntries,
      features: JSON.parse(formEntries.features || "[]"),
      imageUrls,
      userId: userData.id,
      slug,
      status: userData.role === "superadmin" ? 1 : 0,
      createdAt: new Date(),
    };

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

    // Fetch only cars where status is 0 (pending approval)
    const cars = await db.collection("cars").find().toArray();
    const dealerLocations = await db
      .collection("dealerLocations")
      .find({})
      .toArray();

    const carsWithDealerInfo = cars.map((car) => ({
      ...car,
      dealerInfo:
        dealerLocations.find((dealer) => dealer.id === car.dealerId) || null,
    }));

    return NextResponse.json({ cars: carsWithDealerInfo });
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
