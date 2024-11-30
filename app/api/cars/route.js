import { NextResponse } from "next/server";

export async function GET(req) {
  const cars = [
    { id: 1, make: "Toyota", model: "Corolla", price: 12000, type: "Sedan" },
    { id: 2, make: "Honda", model: "Civic", price: 25000, type: "Sedan" },
    { id: 3, make: "BMW", model: "X5", price: 45000, type: "SUV" },
    { id: 4, make: "Mercedes", model: "C-Class", price: 70000, type: "Hybrid" },
    { id: 5, make: "Tesla", model: "Model 3", price: 35000, type: "Electric" },
    { id: 6, make: "Ford", model: "Fiesta", price: 15000, type: "Hatchback" },
    { id: 7, make: "Chevrolet", model: "Malibu", price: 22000, type: "Sedan" },
    { id: 8, make: "Hyundai", model: "Santa Fe", price: 27000, type: "SUV" },
    { id: 9, make: "Kia", model: "Sorento", price: 32000, type: "SUV" },
    { id: 10, make: "Nissan", model: "Altima", price: 23000, type: "Sedan" },
    { id: 11, make: "Mazda", model: "CX-5", price: 29000, type: "SUV" },
    {
      id: 12,
      make: "Volkswagen",
      model: "Passat",
      price: 28000,
      type: "Sedan",
    },
    { id: 13, make: "Subaru", model: "Outback", price: 34000, type: "SUV" },
    { id: 14, make: "Audi", model: "A4", price: 41000, type: "Luxury" },
    { id: 15, make: "Volvo", model: "XC90", price: 55000, type: "SUV" },
    { id: 16, make: "Jeep", model: "Wrangler", price: 39000, type: "Offroad" },
    {
      id: 17,
      make: "Land Rover",
      model: "Discovery",
      price: 67000,
      type: "SUV",
    },
    { id: 18, make: "Porsche", model: "Macan", price: 80000, type: "Luxury" },
    { id: 19, make: "Lexus", model: "RX 350", price: 60000, type: "SUV" },
    { id: 20, make: "Acura", model: "MDX", price: 50000, type: "SUV" },
    {
      id: 21,
      make: "Cadillac",
      model: "Escalade",
      price: 90000,
      type: "Luxury",
    },
    { id: 22, make: "Toyota", model: "RAV4", price: 26000, type: "SUV" },
    { id: 23, make: "Ford", model: "Mustang", price: 36000, type: "Sports" },
    {
      id: 24,
      make: "Chevrolet",
      model: "Camaro",
      price: 37000,
      type: "Sports",
    },
    { id: 25, make: "Tesla", model: "Model Y", price: 50000, type: "Electric" },
    { id: 26, make: "Hyundai", model: "Kona", price: 22000, type: "Hatchback" },
    { id: 27, make: "BMW", model: "3 Series", price: 42000, type: "Luxury" },
    { id: 28, make: "Mercedes", model: "GLA", price: 54000, type: "SUV" },
    { id: 29, make: "Honda", model: "CR-V", price: 29000, type: "SUV" },
    { id: 30, make: "Mazda", model: "Mazda3", price: 20000, type: "Sedan" },
    { id: 31, make: "Nissan", model: "Rogue", price: 27000, type: "SUV" },
    { id: 32, make: "Kia", model: "Optima", price: 23000, type: "Sedan" },
    {
      id: 33,
      make: "Volkswagen",
      model: "Golf",
      price: 24000,
      type: "Hatchback",
    },
    { id: 34, make: "Audi", model: "Q5", price: 50000, type: "Luxury" },
    { id: 35, make: "Jeep", model: "Cherokee", price: 33000, type: "SUV" },
    { id: 36, make: "Lexus", model: "IS 300", price: 41000, type: "Sedan" },
    {
      id: 37,
      make: "Subaru",
      model: "Impreza",
      price: 21000,
      type: "Hatchback",
    },
    { id: 38, make: "Toyota", model: "Camry", price: 24000, type: "Sedan" },
    { id: 39, make: "Hyundai", model: "Tucson", price: 28000, type: "SUV" },
    { id: 40, make: "Ford", model: "Edge", price: 32000, type: "SUV" },
  ];

  // Get query parameters from the request
  const { searchParams } = new URL(req.url);
  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const priceRange = searchParams.get("priceRange");

  // Parse priceRange (e.g., "10k-20k") to numeric values
  let minPrice = 0;
  let maxPrice = Infinity;
  if (priceRange) {
    const match = priceRange.match(/^(\d+)[kK]-(\d+)[kK]$/);
    if (match) {
      minPrice = parseInt(match[1]) * 1000;
      maxPrice = parseInt(match[2]) * 1000;
    }
  }

  // Filter cars based on the query parameters
  const filteredCars = cars.filter((car) => {
    return (
      (!make || car.make === make) &&
      (!model || car.model === model) &&
      (!priceRange || (car.price >= minPrice && car.price <= maxPrice))
    );
  });

  if (filteredCars.length === 0) {
    return NextResponse.json({ message: "No cars found" }, { status: 404 });
  }

  return NextResponse.json(filteredCars);
}
