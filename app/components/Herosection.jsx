"use client";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { TbCarSuv } from "react-icons/tb";
import {
  FaShuttleVan,
  FaCarSide,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaCar,
} from "react-icons/fa";
import { GiSurferVan } from "react-icons/gi";
import { useTranslations } from "next-intl";
import { IoMdStar } from "react-icons/io";

const HeroSection = () => {
  const t = useTranslations("HomePage");
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  // Updated price range state for dual slider
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(100000);

  const [loading, setLoading] = useState(false);

  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const carouselImages = ["/car1.jpg", "/car2.jpg", "/bmw.jpg", "/car1.jpg"];

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
          const response = await axios.get(
            `/api/models?makeId=${selectedMake}`,
          );
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

  // Auto-rotate carousel - Fixed timing
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleNextImage();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImageIndex, isTransitioning]);

  const handleImageChange = (newIndex) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentImageIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Fixed navigation functions
  const handlePrevImage = () => {
    const newIndex =
      currentImageIndex === 0
        ? carouselImages.length - 1
        : currentImageIndex - 1;
    handleImageChange(newIndex);
  };

  const handleNextImage = () => {
    const newIndex = (currentImageIndex + 1) % carouselImages.length;
    handleImageChange(newIndex);
  };

  const handleSearch = async () => {
    if (!selectedMake && minPrice === 100 && maxPrice === 100000) {
      alert(
        "Please select at least one search criterion (Make or Price Range).",
      );
      return;
    }

    setLoading(true);
    try {
      const queryParams = [];

      if (selectedMake) {
        const makeObj = makes.find((m) => m._id === selectedMake);
        if (makeObj)
          queryParams.push(`make=${encodeURIComponent(makeObj.name)}`);
      }

      if (selectedModel) {
        const modelObj = models.find((m) => m._id === selectedModel);
        if (modelObj)
          queryParams.push(`model=${encodeURIComponent(modelObj.name)}`);
      }

      // Updated price range logic
      if (minPrice !== 100 || maxPrice !== 100000) {
        queryParams.push(`minPrice=${minPrice}`);
        queryParams.push(`maxPrice=${maxPrice}`);
      }

      const queryString = queryParams.join("&");
      router.push(`/car-for-sale?${queryString}`);
    } catch (error) {
      console.error("Error searching cars:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}k`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <section className="relative w-full bg-white transition-colors duration-300 dark:bg-gray-900">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3 rounded-2xl bg-white px-8 py-6 shadow-2xl dark:bg-gray-800">
            <Spinner aria-label="Loading" size="md" className="text-blue-600" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Loading...
            </span>
          </div>
        </div>
      )}

      {/* Hero Carousel Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Carousel Container with Sliding Effect */}
        <div className="relative h-full">
          <div
            className="duration-600 flex h-full transition-transform ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {carouselImages.map((image, index) => (
              <div key={index} className="relative h-full w-full flex-shrink-0">
                <Image
                  src={image}
                  alt={`Premium Car ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

          {/* Enhanced Navigation Controls */}
          <button
            onClick={handlePrevImage}
            disabled={isTransitioning}
            className="group absolute left-8 top-1/2 z-30 -translate-y-1/2 transform rounded-full border border-white/30 bg-white/15 p-4 shadow-lg backdrop-blur-lg transition-all duration-300 hover:border-white/50 hover:bg-white/25 hover:shadow-xl disabled:opacity-50"
          >
            <FaChevronLeft className="h-5 w-5 text-white drop-shadow-lg group-hover:text-white" />
          </button>

          <button
            onClick={handleNextImage}
            disabled={isTransitioning}
            className="group absolute right-8 top-1/2 z-30 -translate-y-1/2 transform rounded-full border border-white/30 bg-white/15 p-4 shadow-lg backdrop-blur-lg transition-all duration-300 hover:border-white/50 hover:bg-white/25 hover:shadow-xl disabled:opacity-50"
          >
            <FaChevronRight className="h-5 w-5 text-white drop-shadow-lg group-hover:text-white" />
          </button>

          {/* Enhanced Dots Navigation */}
          <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 transform space-x-3 rounded-full border border-white/20 bg-black/20 px-6 py-3 backdrop-blur-md">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                disabled={isTransitioning}
                className={`h-2 rounded-full transition-all duration-300 disabled:opacity-50 ${
                  index === currentImageIndex
                    ? "w-8 bg-white shadow-lg"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Counter Design */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="max-w-5xl px-6 text-center">
            <div className="space-y-12">
              <div className="mx-auto grid max-w-2xl grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="mb-2 text-5xl font-bold text-white">
                    1000+
                  </div>
                  <div className="text-sm uppercase tracking-wide text-white/80">
                    Cars Available
                  </div>
                </div>
                <div className="border-x border-white/30 text-center">
                  <div className="flex justify-center">
                    <div className="mb-2 text-5xl font-bold text-white">5</div>
                    <IoMdStar className="mb-2 text-5xl font-bold text-white" />
                  </div>
                  <div className="text-sm uppercase tracking-wide text-white/80">
                    Rated Service
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-5xl font-bold text-white">24/7</div>
                  <div className="text-sm uppercase tracking-wide text-white/80">
                    Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Search Section - Redesigned */}
      <div className="bg-gradient-to-br from-gray-50 to-white px-4 py-16 transition-colors duration-300 dark:from-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Find Your Perfect Vehicle
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              Use our intelligent search system to discover the car that
              perfectly matches your preferences and budget
            </p>
            <div className="mx-auto mt-6 h-1 w-32 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
          </div>

          {/* Redesigned Search Container */}
          <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Make Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                    {t("selectMake")}
                  </span>
                </label>
                <div className="relative">
                  <select
                    id="make"
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                    className="custom-select w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 font-medium text-gray-800 transition-all duration-200 hover:bg-gray-100 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    <option value="" className="text-gray-400">
                      Select Make
                    </option>
                    {makes.map((make) => (
                      <option
                        key={make._id}
                        value={make._id}
                        className="text-gray-800 dark:text-gray-200"
                      >
                        {make.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Model Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-600"></div>
                    {t("selectModel")}
                  </span>
                </label>
                <div className="relative">
                  <select
                    id="model"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="custom-select w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 font-medium text-gray-800 transition-all duration-200 hover:bg-gray-100 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:disabled:bg-gray-800"
                    disabled={!selectedMake}
                  >
                    <option value="" className="text-gray-400">
                      Select Model
                    </option>
                    {models.map((model) => (
                      <option
                        key={model._id}
                        value={model._id}
                        className="text-gray-800 dark:text-gray-200"
                      >
                        {model.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Price Range Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-600"></div>
                    {t("priceRange")}
                  </span>
                </label>

                {/* Dual Range Slider */}
                <div className="space-y-4">
                  <div className="relative h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                    {/* Track fill */}
                    <div
                      className="absolute h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                      style={{
                        left: `${(minPrice / 100000) * 100}%`,
                        width: `${((maxPrice - minPrice) / 100000) * 100}%`,
                      }}
                    ></div>

                    {/* Min range input */}
                    <input
                      type="range"
                      min="100"
                      max="100000"
                      step="1000"
                      value={minPrice}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value < maxPrice) {
                          setMinPrice(value);
                        }
                      }}
                      className="range-slider absolute h-2 w-full cursor-pointer appearance-none bg-transparent"
                    />

                    {/* Max range input */}
                    <input
                      type="range"
                      min="100"
                      max="100000"
                      step="1000"
                      value={maxPrice}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value > minPrice) {
                          setMaxPrice(value);
                        }
                      }}
                      className="range-slider absolute h-2 w-full cursor-pointer appearance-none bg-transparent"
                    />
                  </div>

                  {/* Price Input Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Min Price
                      </label>
                      <input
                        type="number"
                        min="100"
                        max="100000"
                        step="100"
                        value={minPrice}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 100;
                          if (value < maxPrice && value >= 100) {
                            setMinPrice(value);
                          }
                        }}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                        placeholder="Min"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Max Price
                      </label>
                      <input
                        type="number"
                        min="100"
                        max="100000"
                        step="1000"
                        value={maxPrice}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 100000;
                          if (value > minPrice && value <= 100000) {
                            setMaxPrice(value);
                          }
                        }}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="text-center">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                    </span>
                  </div>

                  {/* Price Range Labels */}
                  <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
                    <span>$1K</span>
                    <span>$100K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Search Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="group relative flex min-w-[200px] transform items-center justify-center space-x-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-12 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="absolute inset-0 -translate-x-full -skew-x-12 transform bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-1000 group-hover:translate-x-full"></div>
                <FaSearch className="relative z-10 h-5 w-5" />
                <span className="relative z-10">
                  {loading ? "Searching..." : `${t("searchCar")}`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Vehicle Categories Section */}
      <div className="bg-white px-4 py-16 transition-colors duration-300 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center space-x-2 rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <FaCar className="h-4 w-4" />
              <span>Vehicle Categories</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              {t("browseVehical")}
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              Explore our comprehensive collection of vehicles organized by
              category to find exactly what you are looking for
            </p>
            <div className="mx-auto mt-6 h-1 w-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: TbCarSuv, label: t("suv"), href: "/", color: "blue" },
              {
                icon: FaShuttleVan,
                label: t("sedan"),
                href: "/",
                color: "green",
              },
              {
                icon: FaCarSide,
                label: t("hatchback"),
                href: "/",
                color: "purple",
              },
              {
                icon: GiSurferVan,
                label: t("coupe"),
                href: "/",
                color: "orange",
              },
              { icon: FaCarSide, label: t("hybrid"), href: "/", color: "teal" },
            ].map((item, index) => (
              <Link key={index} href={item.href}>
                <div className="hover:scale-102 group relative transform cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:border-blue-300 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500 dark:hover:from-gray-700 dark:hover:to-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 transition-all duration-300 group-hover:from-blue-500/5 group-hover:to-purple-500/5"></div>
                  <div className="relative z-10 flex flex-col items-center space-y-3">
                    <div className="rounded-xl bg-gray-100 p-4 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-100 dark:bg-gray-700 dark:group-hover:bg-blue-900/30">
                      <item.icon className="h-7 w-7 text-gray-600 transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 transition-colors duration-300 group-hover:text-blue-700 dark:text-gray-300 dark:group-hover:text-blue-400">
                      {item.label}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-select {
          background-image: none;
        }

        .range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 2;
        }

        .range-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .range-slider::-webkit-slider-track {
          background: transparent;
        }

        .range-slider::-moz-range-track {
          background: transparent;
        }

        .range-slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }

        .range-slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
