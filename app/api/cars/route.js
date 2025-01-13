import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

//paste this in .env
//MONGODB_URI= mongodb+srv://sysfoc:2alF7MUy7ogSXqby@cardealor.7w3ln.mongodb.net/?retryWrites=true&w=majority&appName=cardealor

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

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
