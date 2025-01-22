import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const uploadDir = path.join(process.cwd(), "public", "uploads");

const defaultImageUrl = "/Luxury SUV.webp"; // Default image URL in the public/uploads folder

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
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

export async function POST(req) {
  try {
    const formData = await req.formData();

    const image = formData.get("image");

    if (!image) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 },
      );
    }

    const fileName = image.name;
    const filePath = path.join(uploadDir, fileName);

    const buffer = Buffer.from(await image.arrayBuffer());
    await fs.promises.writeFile(filePath, buffer);

    const carData = {
      ...Object.fromEntries(formData.entries()),
      imageUrl: `/uploads/${fileName}`,
    };

    await client.connect();
    const db = client.db("cardealor");
    const result = await db.collection("cars").insertOne(carData);

    return NextResponse.json(
      { message: "Car added successfully", data: result },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add car", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const image = formData.get("image");

//     let imageUrl = defaultImageUrl; // Default image path

//     if (image) {
//       try {
//         const fileName = image.name;
//         const filePath = path.join(uploadDir, fileName);

//         const buffer = Buffer.from(await image.arrayBuffer());

//         // Write the image file if the environment supports it
//         if (process.env.NODE_ENV === "development") {
//           await fs.promises.writeFile(filePath, buffer);
//           imageUrl = `/uploads/${fileName}`; // Use the uploaded image
//         }
//       } catch (err) {
//         console.error("Image upload failed. Using default image:", err.message);
//       }
//     }

//     // Build the car data object with the resolved image URL
//     const carData = {
//       ...Object.fromEntries(formData.entries()),
//       imageUrl,
//     };

//     await client.connect();
//     const db = client.db("cardealor");
//     const result = await db.collection("cars").insertOne(carData);

//     return NextResponse.json(
//       { message: "Car added successfully", data: result },
//       { status: 201 },
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to add car", details: error.message },
//       { status: 500 },
//     );
//   } finally {
//     await client.close();
//   }
// }
