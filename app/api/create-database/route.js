import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("cardealor"); // Replace with your desired database name

    // Optional: Create a collection
    await db.createCollection("cars"); // Replace with your desired collection name

    return new Response(
      JSON.stringify({
        message: "Database and collection created successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error connecting to MongoDB", error }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
