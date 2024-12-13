import { NextResponse } from "next/server";

export async function GET(req) {
  const cars = [
    {
      id: 1,
      make: "Toyota",
      model: "Corolla",
      price: 18000,
      type: "Sedan",
      kms: "25,000",
      fuel_type: "Petrol",
      fuel_tank_fill_price: "$50",
      fuel_capacity_per_tank: "50L",
      no_of_gears: 6,
      cylinder: 4,
      features: ["Air Conditioning", "Bluetooth", "Backup Camera"],
      vehicle_full_name: "Toyota Corolla Sedan 2021",
      doors: 4,
      seats: 5,
      fuelType: "Petrol",
      gearBox: "Automatic",
      engineCapacity: "2.0L",
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      price: 22000,
      type: "Sedan",
      kms: "18,000",
      fuel_type: "Diesel",
      fuel_tank_fill_price: "$60",
      fuel_capacity_per_tank: "55L",
      no_of_gears: 6,
      cylinder: 4,
      features: ["Cruise Control", "Heated Seats", "Keyless Entry"],
      vehicle_full_name: "Honda Civic Sedan 2022",
      doors: 4,
      seats: 5,
      fuelType: "Diesel",
      gearBox: "Manual",
      engineCapacity: "1.8L",
    },
    {
      id: 3,
      make: "Tesla",
      model: "Model 3",
      price: 40000,
      type: "Electric",
      kms: "10,000",
      fuel_type: "Electric",
      fuel_tank_fill_price: "N/A",
      fuel_capacity_per_tank: "N/A",
      no_of_gears: 1,
      cylinder: 0,
      features: ["Autopilot", "Wireless Charging", "Touchscreen Display"],
      vehicle_full_name: "Tesla Model 3 2023",
      doors: 4,
      seats: 5,
      fuelType: "Electric",
      gearBox: "Single Speed",
      engineCapacity: "N/A",
    },
    {
      id: 4,
      make: "Ford",
      model: "Mustang",
      price: 35000,
      type: "Coupe",
      kms: "15,000",
      fuel_type: "Petrol",
      fuel_tank_fill_price: "$70",
      fuel_capacity_per_tank: "60L",
      no_of_gears: 6,
      cylinder: 8,
      features: ["Performance Package", "Leather Seats", "Premium Audio"],
      vehicle_full_name: "Ford Mustang GT Coupe 2022",
      doors: 2,
      seats: 4,
      fuelType: "Petrol",
      gearBox: "Automatic",
      engineCapacity: "5.0L",
    },
    {
      id: 5,
      make: "Chevrolet",
      model: "Camaro",
      price: 30000,
      type: "Coupe",
      kms: "12,000",
      fuel_type: "Petrol",
      fuel_tank_fill_price: "$65",
      fuel_capacity_per_tank: "58L",
      no_of_gears: 6,
      cylinder: 6,
      features: ["Turbocharged Engine", "Sport Suspension", "LED Headlights"],
      vehicle_full_name: "Chevrolet Camaro 2022",
      doors: 2,
      seats: 4,
      fuelType: "Petrol",
      gearBox: "Manual",
      engineCapacity: "3.6L",
    },
    {
      id: 6,
      make: "Hyundai",
      model: "Elantra",
      price: 20000,
      type: "Sedan",
      kms: "20,000",
      fuel_type: "Petrol",
      fuel_tank_fill_price: "$55",
      fuel_capacity_per_tank: "52L",
      no_of_gears: 6,
      cylinder: 4,
      features: ["Adaptive Cruise Control", "Heated Seats", "Apple CarPlay"],
      vehicle_full_name: "Hyundai Elantra Sedan 2022",
      doors: 4,
      seats: 5,
      fuelType: "Petrol",
      gearBox: "Automatic",
      engineCapacity: "2.0L",
    },
    {
      id: 7,
      make: "Kia",
      model: "Sportage",
      price: 25000,
      type: "SUV",
      kms: "22,000",
      fuel_type: "Diesel",
      fuel_tank_fill_price: "$70",
      fuel_capacity_per_tank: "65L",
      no_of_gears: 8,
      cylinder: 4,
      features: ["All-Wheel Drive", "Panoramic Sunroof", "Navigation"],
      vehicle_full_name: "Kia Sportage SUV 2022",
      doors: 4,
      seats: 5,
      fuelType: "Diesel",
      gearBox: "Automatic",
      engineCapacity: "2.2L",
    },
    {
      id: 8,
      make: "BMW",
      model: "3 Series",
      price: 45000,
      type: "Sedan",
      kms: "5,000",
      fuel_type: "Petrol",
      fuel_tank_fill_price: "$80",
      fuel_capacity_per_tank: "60L",
      no_of_gears: 8,
      cylinder: 4,
      features: ["Luxury Package", "Driver Assistance", "Harman Kardon Sound"],
      vehicle_full_name: "BMW 3 Series Sedan 2023",
      doors: 4,
      seats: 5,
      fuelType: "Petrol",
      gearBox: "Automatic",
      engineCapacity: "2.0L",
    },
    {
      id: 9,
      make: "Mercedes-Benz",
      model: "C-Class",
      price: 50000,
      type: "Sedan",
      kms: "8,000",
      fuel_type: "Diesel",
      fuel_tank_fill_price: "$85",
      fuel_capacity_per_tank: "62L",
      no_of_gears: 9,
      cylinder: 4,
      features: ["Ambient Lighting", "Premium Leather", "Heads-Up Display"],
      vehicle_full_name: "Mercedes-Benz C-Class Sedan 2023",
      doors: 4,
      seats: 5,
      fuelType: "Diesel",
      gearBox: "Automatic",
      engineCapacity: "2.0L",
    },
    {
      id: 10,
      make: "Audi",
      model: "A4",
      price: 48000,
      type: "Sedan",
      kms: "6,000",
      fuel_type: "Petrol",
      fuel_tank_fill_price: "$75",
      fuel_capacity_per_tank: "58L",
      no_of_gears: 8,
      cylinder: 4,
      features: [
        "Virtual Cockpit",
        "Matrix LED Lights",
        "Bang & Olufsen Sound",
      ],
      vehicle_full_name: "Audi A4 Sedan 2023",
      doors: 4,
      seats: 5,
      fuelType: "Petrol",
      gearBox: "Automatic",
      engineCapacity: "2.0L",
    },
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

  const exactMatches = cars.filter((car) => {
    return (
      (!slug || car.slug === slug) &&
      (!make || car.make === make) &&
      (!model || car.model === model) &&
      (!priceRange || (car.price >= minPrice && car.price <= maxPrice))
    );
  });

  const alternativeSuggestions = cars.filter((car) => {
    return (
      (!make || car.make === make) &&
      (!model || car.model === model) &&
      !exactMatches.includes(car)
    );
  });

  return NextResponse.json({
    exactMatches,
    alternativeSuggestions,
  });
}
