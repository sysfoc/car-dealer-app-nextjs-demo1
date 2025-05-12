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

  const [loading, setLoading] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const fetchMakes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/makes");
        setMakes(response.data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMakes();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if (selectedMake) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/models?makeId=${selectedMake}`);
          setModels(response.data);
        } catch (error) {
          console.error("Error fetching models:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchModels();
  }, [selectedMake]);
  
  const handleSearch = async () => {
    if (!selectedMake && !priceRange) {
      alert("Please select at least one search criterion (Make or Price Range).");
      return;
    }

    setLoading(true);
    try {
      const queryParams = [];

      if (selectedMake) {
        const makeObj = makes.find(m => m._id === selectedMake);
        if (makeObj) queryParams.push(`make=${encodeURIComponent(makeObj.name)}`);
      }

      if (selectedModel) {
        const modelObj = models.find(m => m._id === selectedModel);
        if (modelObj) queryParams.push(`model=${encodeURIComponent(modelObj.name)}`);
      }

      if (priceRange) queryParams.push(`price=${priceRange}`);

      const queryString = queryParams.join("&");
      router.push(`/car-for-sale?${queryString}`);
    } catch (error) {
      console.error("Error searching cars:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full">
      <Image
        src="/Luxury SUV.webp"
        alt="Luxury SUV Background"
        fill
        style={{ objectPosition: "center" }}
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
                {t("selectMake")}
              </label>
              <select
                id="make"
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full border-0 bg-transparent p-3 focus:ring-0 dark:text-gray-200"
              >
                <option value="">{t("selectMake")}</option>
                {makes.map((make) => (
                  <option key={make._id} value={make._id}>
                    {make.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="model" className="sr-only">
                {t("selectModel")}
              </label>
              <select
                id="model"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full border-0 bg-transparent p-3 focus:ring-0 dark:text-gray-200"
                disabled={!selectedMake}
              >
                <option value="">{t("selectModel")}</option>
                {models.map((model) => (
                  <option key={model._id} value={model._id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price" className="sr-only">
                {t("priceRange")}
              </label>
              <select
                id="price"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full border-0 bg-transparent p-3 focus:ring-0 dark:text-gray-200"
              >
                <option value="">{t("priceRange")}</option>
                <option value="16000">16000</option>
                <option value="17000">17000</option>
                <option value="18000">18000</option>
                <option value="19000">19000</option>
              </select>
            </div>
            <div>
              <Button
                pill
                color={"blue"}
                onClick={handleSearch}
                className="w-full p-2 dark:bg-red-500"
              >
                {loading ? "Searching..." : `${t("searchCar")}`}
              </Button>
            </div>
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
                    <span className="text-sm">{t("suv")}</span>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <FaShuttleVan fontSize={22} />
                    <span className="text-sm">{t("sedan")}</span>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <FaCarSide fontSize={22} />
                    <span className="text-sm">{t("hatchback")}</span>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <GiSurferVan fontSize={22} />
                    <span className="text-sm">{t("coupe")}</span>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <FaCarSide fontSize={22} />
                    <span className="text-sm">{t("hybrid")}</span>
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
