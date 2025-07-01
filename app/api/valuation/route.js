import connectDB from "../../lib/mongodb";
import Valuation from "../../models/Valuation";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const newValuation = new Valuation(data);
    await newValuation.save();

    return new Response(JSON.stringify({ message: "Valuation saved!" }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error saving data" }), {
      status: 500,
    });
  }
}
