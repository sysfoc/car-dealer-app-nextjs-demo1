"use client";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "flowbite-react";
import Link from "next/link";
import { TbCarSuv } from "react-icons/tb";
import { FaShuttleVan, FaCarSide } from "react-icons/fa";
import { GiSurferVan } from "react-icons/gi";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("HomePage");
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [cars, setCars] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alternativeCars, setAlternativeCars] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchMakes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cars`,
        );
        console.log("Response Data:", response.data);

        if (
          response.data.exactMatches &&
          Array.isArray(response.data.exactMatches)
        ) {
          const makes = [
            ...new Set(response.data.exactMatches.map((car) => car.make)),
          ];
          setMakes(makes);
        } else {
          console.error("Data is not in expected format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMakes();
  }, []);

  useEffect(() => {
    if (selectedMake) {
      const fetchModels = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/cars?make=${selectedMake}`,
          );
          console.log("Models Response Data:", response.data);

          if (
            response.data.exactMatches &&
            Array.isArray(response.data.exactMatches)
          ) {
            const models = [
              ...new Set(response.data.exactMatches.map((car) => car.model)),
            ];
            setModels(models);
          } else {
            console.error(
              "Models data is not in expected format:",
              response.data,
            );
          }
        } catch (error) {
          console.error("Error fetching models:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchModels();
    }
  }, [selectedMake]);

  const handleSearch = async () => {
    if (selectedMake && selectedModel && priceRange) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cars?make=${selectedMake}&model=${selectedModel}&priceRange=${priceRange}`,
        );
        console.log("Search Response Data:", response.data);

        const cars = response.data.exactMatches || [];
        const alternatives = response.data.alternativeSuggestions || [];

        if (cars.length > 0) {
          setSuggestions(cars);
          setAlternativeCars([]);
        } else if (alternatives.length > 0) {
          setAlternativeCars(alternatives);
          setSuggestions([]);
        } else {
          setSuggestions([]);
          setAlternativeCars([]);
          alert("No cars found. Please refine your search or try again later.");
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);
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
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative flex h-[120vh] w-full items-center justify-center px-5">
        <div className="w-full sm:w-4/5">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
              <Spinner aria-label="Spinner button example" size="sm" />
              <span className="pl-3">Loading...</span>
            </div>
          )}
          <div className="mb-8">
            <p className="text-center text-sm text-white">
              {t("metaDescription")}
            </p>
            <h1 className="mt-3 text-center text-4xl font-semibold text-white sm:my-6 md:text-5xl lg:text-7xl">
              {t("h1Heading")}
            </h1>
          </div>
          <div className="my-5 grid grid-cols-1 items-center gap-3 rounded bg-white px-3 py-4 dark:bg-gray-800 sm:grid-cols-2 md:grid-cols-4 md:rounded-full">
            <div>
              <label htmlFor="make" className="sr-only">
                Select Make
              </label>
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
              <label htmlFor="model" className="sr-only">
                Select Model
              </label>
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
              <label htmlFor="price" className="sr-only">
                Price Range
              </label>
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
                <option value="50k-100k">50k-100k</option>
              </select>
            </div>
            <div>
              <Button
                pill
                color={"blue"}
                onClick={handleSearch}
                className="w-full p-2 dark:bg-red-500"
                disabled={
                  loading || !selectedMake || !selectedModel || !priceRange
                }
              >
                {loading ? "Searching..." : "Search Cars"}
              </Button>
            </div>
          </div>
          <div className="mt-6">
            {/* Display exact matches */}
            {suggestions.length > 0 && (
              <div>
                <h2 className="mb-4 text-center text-xl font-semibold text-white">
                  <b className="text-3xl text-green-400">
                    Sucessfully ! Exact match Found
                  </b>
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {suggestions.map((car) => (
                    <div
                      key={car.id}
                      className="flex cursor-pointer rounded-lg bg-gray-100 p-2 text-left hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                      onClick={() => router.push(`/car-detail/${car.slug}`)}
                    >
                      {/* Image Section */}
                      <div className="w-1/3">
                        <Image
                          src="/Luxury SUV.webp"
                          width={150}
                          height={100}
                          alt={`${car.make} ${car.model}`}
                          className=" rounded-md object-cover"
                        />
                      </div>

                      {/* Details Section */}
                      <div className="ml-4 flex w-2/3 flex-col justify-center">
                        <div className="mb-2 flex items-center gap-x-3">
                          <TbCarSuv
                            fontSize={22}
                            className="text-gray-800 dark:text-gray-300"
                          />
                          <span className="text-lg font-semibold text-gray-800 dark:text-white">
                            {car.make} {car.model}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Price:
                          <span className="font-medium">${car.price}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Display alternative suggestions */}
            {alternativeCars.length > 0 && (
              <div>
                <h2 className="mb-4 text-center text-xl font-semibold text-white">
                  <b className="text-3xl text-red-700">
                    Exact Match Not Found Some Alternative results :
                  </b>
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {alternativeCars.map((car) => (
                    <div
                      key={car.id}
                      className="flex cursor-pointer rounded-lg bg-gray-100 p-2 text-left hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                      onClick={() => router.push(`/car-detail/${car.slug}`)}
                    >
                      <div className="w-1/3">
                        <Image
                          src="/Luxury SUV.webp"
                          width={150}
                          height={100}
                          alt={`${car.make} ${car.model}`}
                          className=" rounded-md object-cover"
                        />
                      </div>

                      <div className="ml-4 flex w-2/3 flex-col justify-center">
                        <div className="mb-2 flex items-center gap-x-3">
                          <TbCarSuv
                            fontSize={22}
                            className="text-gray-800 dark:text-gray-300"
                          />
                          <span className="text-lg font-semibold text-gray-800 dark:text-white">
                            {car.make} {car.model}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Price:
                          <span className="font-medium">${car.price}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="my-8">
            <p className="text-center text-sm font-semibold text-white">
              {t("browseVehical")}
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
