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

// export async function GET() {
//   try {
//     await client.connect();
//     const db = client.db("cardealor");

//     const cars = await db.collection("cars").find({}).toArray();
//     const dealerLocations = await db
//       .collection("dealerLocations")
//       .find({})
//       .toArray();n

//     const carsWithDealerInfo = cars.map((car) => {
//       const dealerInfo = dealerLocations.find(
//         (dealer) => dealer.id === car.dealerId,
//       );
//       return {
//         ...car,
//         dealerInfo,
//       };
//     });

//     return NextResponse.json({ cars: carsWithDealerInfo });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch data" },
//       { status: 500 },
//     );
//   } finally {
//     await client.close();
//   }
// }
export async function GET() {
  try {
    await client.connect();
    const db = client.db("cardealor");

    // Fetch only cars where status is 0 (pending approval)
    const cars = await db.collection("cars").find({ status: 0 }).toArray();
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
