"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "flowbite-react";
import Link from "next/link";
import { TbCarSuv } from "react-icons/tb";
import { FaShuttleVan, FaCarSide } from "react-icons/fa";
import { GiSurferVan } from "react-icons/gi";
const HeroSection = () => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [cars, setCars] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cars`,
        );
        const makes = [...new Set(response.data.map((car) => car.make))];
        setMakes(makes);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };

    fetchMakes();
  }, []);

  useEffect(() => {
    if (selectedMake) {
      const fetchModels = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/cars?make=${selectedMake}`,
          );
          const models = [...new Set(response.data.map((car) => car.model))];
          setModels(models);
        } catch (error) {
          console.error("Error fetching models:", error);
        }
      };

      fetchModels();
    }
  }, [selectedMake]);

  const handleSearch = async () => {
    if (selectedMake && selectedModel && priceRange) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cars?make=${selectedMake}&model=${selectedModel}&priceRange=${priceRange}`,
        );
        const cars = response.data;
        if (cars.length > 0) {
          setSuggestions(cars);
        } else {
          setSuggestions([]);
          alert("No cars found. Please refine your search.");
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please select all fields before searching.");
    }
  };

  return (
    <section className="relative w-full">
      <Image
        src="/Luxury SUV.webp"
        alt="Luxury SUV Background"
        layout="fill"
        objectFit="cover"
        objectPosition="top center"
        className="z-[-1] opacity-80"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
<<<<<<< HEAD
      <div className="relative flex w-full items-center justify-center px-5 py-44">
        <div className="w-full sm:w-[80%]">
=======
      <div className="relative flex h-[120vh] w-full items-center justify-center px-5">
        <div className="w-full sm:w-4/5">
>>>>>>> b44c481f81876f6d4942e58efab94ecbdb90295f
          <div className="mb-8">
            <p className="text-center text-sm text-white">
              Find cars for sale and for rent near you
            </p>
            <h1 className="mt-3 text-center text-4xl font-semibold text-white sm:my-6 md:text-5xl lg:text-7xl">
              Find Your Perfect Car
            </h1>
          </div>
          <div className="my-5 grid grid-cols-1 items-center gap-3 rounded bg-white px-3 py-4 dark:bg-gray-800 sm:grid-cols-2 md:grid-cols-4 md:rounded-full">
            <div>
              <select
                id="make"
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full border-0 bg-transparent p-3 focus:ring-0 dark:text-gray-200"
              >
                <option value="">Select Make</option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="model"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full border-0 bg-transparent p-3 focus:ring-0 dark:text-gray-200"
                disabled={!selectedMake}
              >
                <option value="">Select Model</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="price"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full border-0 bg-transparent p-3 focus:ring-0 dark:text-gray-200"
              >
                <option value="">Price Range</option>
                <option value="10k-20k">10k-20k</option>
                <option value="20k-30k">20k-30k</option>
                <option value="30k-50k">30k-50k</option>
              </select>
            </div>
            <div>
              <Button
                pill
                color={"blue"}
                onClick={handleSearch}
                className="w-full p-2 dark:bg-red-500"
              >
                Search Cars
              </Button>
            </div>
          </div>
          {/* suggestion section  update.... if required*/}
          <div className="mt-6">
            {suggestions.length > 0 && (
              <div>
                <h2 className="mb-4 text-center text-xl font-semibold text-white">
                  Suggested Cars
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {suggestions.map((car) => (
                    <div
                      key={car.id}
                      className="cursor-pointer rounded-lg bg-gray-100 p-5 text-center hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                      onClick={() => router.push(`/car-detail/${car.id}`)}
                    >
                      <div className="mb-3 flex items-center justify-center gap-x-3">
                        <TbCarSuv
                          fontSize={22}
                          className="text-gray-800 dark:text-gray-300"
                        />
                        <span className="text-lg font-semibold text-gray-800 dark:text-white">
                          {car.make} {car.model}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Price: <span className="font-medium">${car.price}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="my-8">
            <p className="text-center text-sm font-semibold text-white">
              Or Browse Featured Model
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <TbCarSuv fontSize={22} />
                    <span className="text-sm">SUV</span>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <FaShuttleVan fontSize={22} />
                    <span className="text-sm">Sedan</span>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <FaCarSide fontSize={22} />
                    <span className="text-sm">Hatchback</span>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <GiSurferVan fontSize={22} />
                    <span className="text-sm">Coupe</span>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <FaCarSide fontSize={22} />
                    <span className="text-sm">Hybrid</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
