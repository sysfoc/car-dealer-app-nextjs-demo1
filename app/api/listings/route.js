import connectDB from "../../lib/mongodb";
import Listing from "../../models/Listing";

export async function POST(req) {
  await connectDB();
  try {
    const data = await req.json();
    const listing = new Listing(data);
    await listing.save();
    return new Response(
      JSON.stringify({ success: true, message: "Listing added successfully!" }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error adding listing",
        error: error.message,
      }),
      {
        status: 500,
      },
    );
  }
}
