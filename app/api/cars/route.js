import { NextResponse } from "next/server";

export async function GET(req) {
  const cars = [
    { id: 1, make: "Toyota", model: "Corolla", price: 18000, type: "Sedan" },
    { id: 45, make: "Toyota", model: "Corolla", price: 5000, type: "Sedan1" },
    { id: 46, make: "Toyota", model: "Corolla", price: 5000, type: "Sedan2" },
    { id: 47, make: "Toyota", model: "Corolla", price: 5000, type: "Sedan2" },
    { id: 48, make: "Honda", model: "Civic", price: 11000, type: "Sedan2" },
  ].map((car) => ({
    ...car,
    slug: `${car.make}-${car.model}-${car.id}`
      .toLowerCase()
      .replace(/\s+/g, "-"),
  }));

  const { searchParams } = new URL(req.url);
  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const priceRange = searchParams.get("priceRange");
  const slug = searchParams.get("slug");

  let minPrice = 0;
  let maxPrice = Infinity;

  if (priceRange) {
    const match = priceRange.match(/^(\d+)[kK]-(\d+)[kK]$/);
    if (match) {
      minPrice = parseInt(match[1]) * 1000;
      maxPrice = parseInt(match[2]) * 1000;
    }
  }

  // Filter exact matches based on make, model, and price range
  const exactMatches = cars.filter((car) => {
    return (
      (!slug || car.slug === slug) &&
      (!make || car.make === make) &&
      (!model || car.model === model) &&
      (!priceRange || (car.price >= minPrice && car.price <= maxPrice))
    );
  });

  // Find alternative suggestions for the same make and model regardless of price range
  const alternativeSuggestions = cars.filter((car) => {
    return (
      (!make || car.make === make) &&
      (!model || car.model === model) &&
      !exactMatches.includes(car) // Exclude exact matches
    );
  });

  return NextResponse.json({
    exactMatches,
    alternativeSuggestions,
  });
}
