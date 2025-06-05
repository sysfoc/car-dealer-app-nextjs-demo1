// import { MongoClient, ObjectId } from "mongodb";
// import { NextResponse, NextRequest } from "next/server";
// import fs from "fs";
// import path from "path";
// import { verifyUserToken } from "../../lib/auth";

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

// const uploadDir = path.join(process.cwd(), "public", "uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// export async function PATCH(req) {
//   try {
//     await client.connect();
//     const db = client.db("cardealor");

//     const userData = await verifyUserToken(req);
//     if ("error" in userData) {
//       return NextResponse.json(
//         { error: userData.error },
//         { status: userData.status },
//       );
//     }

//     if (userData.role !== "superadmin") {
//       return NextResponse.json(
//         { error: "Access Denied: Only superadmin can update status" },
//         { status: 403 },
//       );
//     }

//     const { carId, status } = await req.json();
//     if (!carId || (status !== 0 && status !== 1)) {
//       return NextResponse.json(
//         { error: "Invalid request: carId and valid status (0 or 1) required" },
//         { status: 400 },
//       );
//     }

//     const objectId = new ObjectId(String(carId));

//     const result = await db.collection("cars").updateOne(
//       { _id: objectId },
//       { $set: { status } },
//     );

//     if (result.matchedCount === 0) {
//       return NextResponse.json({ error: "Car not found" }, { status: 404 });
//     }

//     return NextResponse.json({
//       message: `Car ${status === 1 ? "approved" : "unapproved"} successfully`,
//     });
//   } catch (error) {
//     console.error("Error updating car status:", error);
//     return NextResponse.json(
//       { error: "Failed to update car status", details: error.message },
//       { status: 500 },
//     );
//   } finally {
//     await client.close();
//   }
// }


// async function generateUniqueSlug(db, makeName, userIdString) {
//   let slug = makeName
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");

//   let uniqueSlug = `${slug}-${userIdString}`;
//   let count = 1;

//   while (await db.collection("cars").findOne({ slug: uniqueSlug })) {
//     uniqueSlug = `${slug}-${userIdString}-${count}`;
//     count++;
//   }

//   return uniqueSlug;
// }

// export async function POST(req) {
//   try {
//     const userData = await verifyUserToken(req);
//     console.log("Raw userData.id:", userData.id);

//     const userIdString = userData.id?.toString?.() || null;

//     console.log("Converted userIdString:", userIdString);
//     console.log('userIdString:', userIdString);
//     if (!userIdString) {
//       return NextResponse.json(
//         { error: "Invalid user ID format" },
//         { status: 400 }
//       );
//     }

//     if ("error" in userData) {
//       return NextResponse.json(
//         { error: userData.error },
//         { status: userData.status }
//       );
//     }

//     if (!userData.id) {
//       return NextResponse.json(
//         { error: "Invalid user data: No user ID" },
//         { status: 400 }
//       );
//     }

//     console.log("Computed userIdString:", userIdString); // Debugging log

//     const formData = await req.formData();
//     const formEntries = Object.fromEntries(formData.entries());

//     const images = formData.getAll("image");
//     if (images.length === 0) {
//       return NextResponse.json(
//         { error: "At least one image is required" },
//         { status: 400 }
//       );
//     }
//     const imageUrls = [];
//     for (const image of images) {
//       const fileName = `${Date.now()}-${image.name}`;
//       const filePath = path.join(uploadDir, fileName);
//       const buffer = Buffer.from(await image.arrayBuffer());
//       await fs.promises.writeFile(filePath, buffer);
//       imageUrls.push(`/uploads/${fileName}`);
//     }
//     await client.connect();
//     const db = client.db("cardealor");
//     const makeId = formEntries.make;
//     const make = await db.collection("makes").findOne({
//       _id: new ObjectId(String(makeId)),
//     });

//     if (!make) {
//       return NextResponse.json({ error: "Invalid Make ID" }, { status: 400 });
//     }

//     const slug = await generateUniqueSlug(
//       db,
//       make.name,
//       userIdString
//     );
//     const carData = {
//       ...formEntries,
//       make: new ObjectId(formEntries.make),
//       model: new ObjectId(formEntries.model),
//       features: JSON.parse(formEntries.features || "[]"),
//       imageUrls,
//       userId: new ObjectId(userIdString),
//       slug,
//       status: userData.role === "superadmin" ? 1 : 0,
//       createdAt: new Date(),
//     };

//     console.log("Final carData with userId:", carData);
    
//     const result = await db.collection("cars").insertOne(carData);

//     return NextResponse.json(
//       {
//         message: "Car added successfully",
//         data: { ...carData, _id: result.insertedId },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error occurred:", error);
//     return NextResponse.json(
//       { error: "Failed to add car", details: error.message },
//       { status: 500 }
//     );
//   } finally {
//     await client.close();
//   }
// }


// export async function GET() {
//   try {
//     await client.connect();
//     const db = client.db("cardealor");

//     const cars = await db.collection("cars").find().toArray();

//     const formattedCars = cars.map((car) => ({
//       ...car,
//       _id: car._id.toString(),
//       make: car.make?.toString(),
//       model: car.model?.toString(),
//       userId: car.userId?.toString(),
//       dealerId: car.dealerId?.toString(),
//     }));

//     const makeIds = [...new Set(formattedCars.map((c) => c.make).filter(Boolean))];
//     const modelIds = [...new Set(formattedCars.map((c) => c.model).filter(Boolean))];

//     const [makes, models] = await Promise.all([
//       db
//         .collection("makes")
//         .find({ _id: { $in: makeIds.map((id) => new ObjectId(id)) } })
//         .toArray(),
//       db
//         .collection("carmodels") // Corrected collection name
//         .find({ _id: { $in: modelIds.map((id) => new ObjectId(id)) } })
//         .toArray(),
//     ]);

//     const makeMap = makes.reduce((acc, make) => {
//       acc[make._id.toString()] = make.name;
//       return acc;
//     }, {});

//     const modelMap = models.reduce((acc, model) => {
//       acc[model._id.toString()] = {
//         name: model.name,
//         makeId: model.makeId.toString(),
//       };
//       return acc;
//     }, {});

//     const missingModels = modelIds.filter((id) => !modelMap[id]);
//     if (missingModels.length > 0) {
//       console.log("Missing model IDs:", missingModels);
//       console.log("Available model IDs:", models.map((m) => m._id.toString()));
//     }

//     const enrichedCars = formattedCars.map((car) => {
//       const modelInfo = modelMap[car.model?.toString()] || {};
//       return {
//         ...car,
//         makeName: makeMap[car.make?.toString()] || "Unknown Make",
//         modelName: modelInfo.name || "Unknown Model",
//         makeId: car.make,
//         modelId: car.model,
//       };
//     });

//     return NextResponse.json({ cars: enrichedCars });
//   } catch (error) {
//     console.error("Population error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch data", details: error.message },
//       { status: 500 },
//     );
//   }
// }
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { verifyUserToken } from "../../lib/auth";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Ensure upload directory exists
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

    const objectId = new ObjectId(String(carId));

    const result = await db.collection("cars").updateOne(
      { _id: objectId },
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

async function generateUniqueSlug(db, makeName, userIdString) {
  let slug = makeName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let uniqueSlug = `${slug}-${userIdString}`;
  let count = 1;

  while (await db.collection("cars").findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${userIdString}-${count}`;
    count++;
  }

  return uniqueSlug;
}

// Helper function to validate and sanitize filename
function sanitizeFileName(fileName) {
  // Remove unsafe characters and limit length
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .toLowerCase()
    .substring(0, 100);
}

// Helper function to validate image type
function isValidImageType(file) {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  return validTypes.includes(file.type);
}

export async function POST(req) {
  let client = null;
  
  try {
    const userData = await verifyUserToken(req);
    console.log("Raw userData.id:", userData.id);

    // Check for authentication errors first
    if ("error" in userData) {
      return NextResponse.json(
        { error: userData.error },
        { status: userData.status }
      );
    }

    if (!userData.id) {
      return NextResponse.json(
        { error: "Invalid user data: No user ID" },
        { status: 400 }
      );
    }

    const userIdString = userData.id?.toString?.() || userData.id;
    console.log("Converted userIdString:", userIdString);

    if (!userIdString) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const formEntries = Object.fromEntries(formData.entries());

    // Get all image files
    const images = formData.getAll("image");
    console.log(`Processing ${images.length} images`);

    if (images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    // Process and save images
    const imageUrls = [];
    const savedFiles = []; // Track saved files for cleanup on error

    try {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        
        // Validate image
        if (!image || !image.name) {
          console.error(`Invalid image at index ${i}`);
          continue;
        }

        // Validate file type
        if (!isValidImageType(image)) {
          console.error(`Invalid file type for ${image.name}: ${image.type}`);
          continue;
        }

        // Validate file size (e.g., max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (image.size > maxSize) {
          console.error(`File too large: ${image.name} (${image.size} bytes)`);
          continue;
        }

        // Generate unique filename
        const fileExtension = path.extname(image.name) || '.jpg';
        const sanitizedName = sanitizeFileName(path.basename(image.name, fileExtension));
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}-${sanitizedName}${fileExtension}`;
        const filePath = path.join(uploadDir, fileName);

        console.log(`Saving image ${i + 1}/${images.length}: ${fileName}`);

        // Convert image to buffer
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Verify buffer has content
        if (buffer.length === 0) {
          console.error(`Empty buffer for image: ${image.name}`);
          continue;
        }

        // Save file
        await fs.promises.writeFile(filePath, buffer);
        
        // Verify file was saved
        const stats = await fs.promises.stat(filePath);
        if (stats.size === 0) {
          console.error(`File saved but empty: ${fileName}`);
          await fs.promises.unlink(filePath).catch(console.error);
          continue;
        }

        console.log(`Successfully saved: ${fileName} (${stats.size} bytes)`);
        
        // Add to successful saves
        savedFiles.push(filePath);
        imageUrls.push(`/uploads/${fileName}`);
      }

      if (imageUrls.length === 0) {
        return NextResponse.json(
          { error: "No valid images could be processed" },
          { status: 400 }
        );
      }

      console.log(`Successfully processed ${imageUrls.length} images:`, imageUrls);

    } catch (imageError) {
      console.error("Error processing images:", imageError);
      
      // Cleanup any saved files on error
      for (const filePath of savedFiles) {
        try {
          await fs.promises.unlink(filePath);
        } catch (cleanupError) {
          console.error(`Error cleaning up file ${filePath}:`, cleanupError);
        }
      }
      
      return NextResponse.json(
        { error: "Failed to process images", details: imageError.message },
        { status: 500 }
      );
    }

    // Connect to database
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db("cardealor");

    // Validate make
    const makeId = formEntries.make;
    if (!makeId) {
      return NextResponse.json({ error: "Make ID is required" }, { status: 400 });
    }

    const make = await db.collection("makes").findOne({
      _id: new ObjectId(String(makeId)),
    });

    if (!make) {
      return NextResponse.json({ error: "Invalid Make ID" }, { status: 400 });
    }

    // Generate slug
    const slug = await generateUniqueSlug(db, make.name, userIdString);

    // Prepare car data
    const carData = {
      ...formEntries,
      make: new ObjectId(formEntries.make),
      model: new ObjectId(formEntries.model),
      features: JSON.parse(formEntries.features || "[]"),
      imageUrls, // This now contains properly saved image URLs
      userId: new ObjectId(userIdString),
      slug,
      status: userData.role === "superadmin" ? 1 : 0,
      createdAt: new Date(),
    };

    console.log("Final carData with imageUrls:", { ...carData, imageUrls });
    
    // Insert car data
    const result = await db.collection("cars").insertOne(carData);

    return NextResponse.json(
      {
        message: "Car added successfully",
        data: { ...carData, _id: result.insertedId },
        imagesProcessed: imageUrls.length
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to add car", details: error.message },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function GET() {
  try {
    await client.connect();
    const db = client.db("cardealor");

    const cars = await db.collection("cars").find().toArray();

    const formattedCars = cars.map((car) => ({
      ...car,
      _id: car._id.toString(),
      make: car.make?.toString(),
      model: car.model?.toString(),
      userId: car.userId?.toString(),
      dealerId: car.dealerId?.toString(),
    }));

    const makeIds = [...new Set(formattedCars.map((c) => c.make).filter(Boolean))];
    const modelIds = [...new Set(formattedCars.map((c) => c.model).filter(Boolean))];

    const [makes, models] = await Promise.all([
      db
        .collection("makes")
        .find({ _id: { $in: makeIds.map((id) => new ObjectId(id)) } })
        .toArray(),
      db
        .collection("carmodels")
        .find({ _id: { $in: modelIds.map((id) => new ObjectId(id)) } })
        .toArray(),
    ]);

    const makeMap = makes.reduce((acc, make) => {
      acc[make._id.toString()] = make.name;
      return acc;
    }, {});

    const modelMap = models.reduce((acc, model) => {
      acc[model._id.toString()] = {
        name: model.name,
        makeId: model.makeId.toString(),
      };
      return acc;
    }, {});

    const enrichedCars = formattedCars.map((car) => {
      const modelInfo = modelMap[car.model?.toString()] || {};
      return {
        ...car,
        makeName: makeMap[car.make?.toString()] || "Unknown Make",
        modelName: modelInfo.name || "Unknown Model",
        makeId: car.make,
        modelId: car.model,
      };
    });

    return NextResponse.json({ cars: enrichedCars });
  } catch (error) {
    console.error("Population error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}