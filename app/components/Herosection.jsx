"use client";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "flowbite-react";
import Link from "next/link";
import { TbCarSuv } from "react-icons/tb";
import { FaShuttleVan, FaCarSide, FaSearch, FaChevronLeft, FaChevronRight, FaCar, FaPlay, FaStar } from "react-icons/fa";
import { GiSurferVan } from "react-icons/gi";
import { useTranslations } from "next-intl";
import { IoMdStar } from "react-icons/io";

const HeroSection = () => {
  const t = useTranslations("HomePage");
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [priceRange, setPriceRange] = useState(50000);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const carouselImages = [
    "/car1.jpg",
    "/car2.jpg",
    "/bmw.jpg",
    "/car1.jpg",
  ];

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
    const newIndex = currentImageIndex === 0 ? carouselImages.length - 1 : currentImageIndex - 1;
    handleImageChange(newIndex);
  };

  const handleNextImage = () => {
    const newIndex = (currentImageIndex + 1) % carouselImages.length;
    handleImageChange(newIndex);
  };

  const handleSearch = async () => {
    if (!selectedMake && priceRange === 50000) {
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

      if (priceRange !== 50000) {
        queryParams.push(`price=${priceRange}`);
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
    return `$${price}`;
  };

  return (
    <section className="relative w-full bg-white dark:bg-gray-900 transition-colors duration-300">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-2xl px-8 py-6 shadow-2xl">
            <Spinner aria-label="Loading" size="md" className="text-blue-600" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Loading...</span>
          </div>
        </div>
      )}

      {/* Hero Carousel Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Carousel Container with Sliding Effect */}
        <div className="relative h-full">
          <div
            className="flex h-full transition-transform duration-600 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {carouselImages.map((image, index) => (
              <div key={index} className="relative w-full h-full flex-shrink-0">
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
            className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/15 hover:bg-white/25 backdrop-blur-lg rounded-full p-4 transition-all duration-300 border border-white/30 hover:border-white/50 group shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            <FaChevronLeft className="w-5 h-5 text-white group-hover:text-white drop-shadow-lg" />
          </button>

          <button
            onClick={handleNextImage}
            disabled={isTransitioning}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/15 hover:bg-white/25 backdrop-blur-lg rounded-full p-4 transition-all duration-300 border border-white/30 hover:border-white/50 group shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            <FaChevronRight className="w-5 h-5 text-white group-hover:text-white drop-shadow-lg" />
          </button>

          {/* Enhanced Dots Navigation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3 bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                disabled={isTransitioning}
                className={`h-2 rounded-full transition-all duration-300 disabled:opacity-50 ${
                  index === currentImageIndex
                    ? 'bg-white w-8 shadow-lg'
                    : 'bg-white/50 hover:bg-white/80 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Alternative Design Elements - Choose one by uncommenting */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center max-w-5xl px-6"> {/* Option 5: Stats Counter Design */}
        


            {/* Option 1: Minimalist Badge Design  */}
           {/* <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-black/20 backdrop-blur-md rounded-full px-8 py-4 border border-white/30 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium tracking-wider uppercase">
                  {t("metaDescription")}
                </span>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-wide drop-shadow-2xl">
                {t("h1Heading")}
              </h1>
            </div> */}

            {/* Option 2: Floating Cards Design */}
             {/* <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                  <FaCar className="w-8 h-8 text-white mb-3 mx-auto" />
                  <h3 className="text-white font-semibold text-lg">Premium Quality</h3>
                  <p className="text-white/80 text-sm mt-2">Certified pre-owned vehicles</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                  <FaStar className="w-8 h-8 text-white mb-3 mx-auto" />
                  <h3 className="text-white font-semibold text-lg">Best Prices</h3>
                  <p className="text-white/80 text-sm mt-2">Competitive market rates</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                  <FaPlay className="w-8 h-8 text-white mb-3 mx-auto" />
                  <h3 className="text-white font-semibold text-lg">Easy Process</h3>
                  <p className="text-white/80 text-sm mt-2">Quick and hassle-free</p>
                </div>
              </div>
            </div> */}

<div className="space-y-12">
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">1000+</div>
                  <div className="text-white/80 text-sm uppercase tracking-wide">Cars Available</div>
                </div>
                <div className="text-center border-x border-white/30">
                <div className="flex justify-center">
                  <div className="text-5xl font-bold text-white mb-2">5</div>
                  <IoMdStar className="text-5xl font-bold text-white mb-2" />
                </div>
                  <div className="text-white/80 text-sm uppercase tracking-wide">Rated Service</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">24/7</div>
                  <div className="text-white/80 text-sm uppercase tracking-wide">Support</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Enhanced Professional Search Section */}
     <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-16 px-4 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Find Your Perfect Vehicle</h2>
            <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Use our intelligent search system to discover the car that perfectly matches your preferences and budget
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-colors duration-300">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-transparent rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-gray-50 dark:from-gray-700/20 to-transparent rounded-full translate-y-24 -translate-x-24 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* Enhanced Make Selection */}
                <div className="space-y-3">
                  <label className="text-gray-800 dark:text-gray-200 text-sm font-bold uppercase tracking-wider flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{t("selectMake")}</span>
                  </label>
                  <div className="relative group">
                    <select
                      id="make"
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                      //className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 text-gray-800 dark:text-gray-200 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 appearance-none cursor-pointer hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg font-medium text-base group-hover:bg-gray-50 dark:group-hover:bg-gray-600"
                    className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 text-gray-800 dark:text-gray-200 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 appearance-none cursor-pointer hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg font-medium text-base group-hover:bg-gray-50 dark:group-hover:bg-gray-600 custom-select"
                    >
                      <option value="" className="text-gray-500 dark:text-gray-400">Choose {t("selectMake")}</option>
                      {makes.map((make) => (
                        <option key={make._id} value={make._id} className="text-gray-800 dark:text-gray-200 py-2">
                          {make.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none group-hover:text-blue-500 transition-colors">
                      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Enhanced Model Selection */}
                <div className="space-y-3">
                  <label className="text-gray-800 dark:text-gray-200 text-sm font-bold uppercase tracking-wider flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{t("selectModel")}</span>
                  </label>
                  <div className="relative group">
                    <select
                      id="model"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      //className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 text-gray-800 dark:text-gray-200 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 appearance-none cursor-pointer hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-600 font-medium text-base group-hover:bg-gray-50 dark:group-hover:bg-gray-600"
                        className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 text-gray-800 dark:text-gray-200 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 appearance-none cursor-pointer hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-600 font-medium text-base group-hover:bg-gray-50 dark:group-hover:bg-gray-600 custom-select"
                      disabled={!selectedMake}
                    >
                      <option value="" className="text-gray-500 dark:text-gray-400">Choose {t("selectModel")}</option>
                      {models.map((model) => (
                        <option key={model._id} value={model._id} className="text-gray-800 dark:text-gray-200 py-2">
                          {model.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none group-hover:text-blue-500 transition-colors">
                      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Enhanced Price Slider */}
                <div className="space-y-3">
                  <label className="text-gray-800 dark:text-gray-200 text-sm font-bold uppercase tracking-wider flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{t("priceRange")}</span>
                  </label>
                  <div className="space-y-4">
                    <div className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                      {formatPrice(priceRange)}
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="1000"
                        max="100000"
                        step="1000"
                        value={priceRange}
                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(priceRange / 100000) * 100}%, #e5e7eb ${(priceRange / 100000) * 100}%, #e5e7eb 100%)`
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>$1k</span>
                      <span>$100k</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Search Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3 min-w-[200px] justify-center text-base overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <FaSearch className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{loading ? "Searching..." : `${t("searchCar")}`}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Vehicle Categories Section */}
      <div className="bg-white dark:bg-gray-900 py-16 px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-full text-sm font-medium mb-6">
              <FaCar className="w-4 h-4" />
              <span>Vehicle Categories</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("browseVehical")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive collection of vehicles organized by category to find exactly what you're looking for
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: TbCarSuv, label: t("suv"), href: "/", color: "blue" },
              { icon: FaShuttleVan, label: t("sedan"), href: "/", color: "green" },
              { icon: FaCarSide, label: t("hatchback"), href: "/", color: "purple" },
              { icon: GiSurferVan, label: t("coupe"), href: "/", color: "orange" },
              { icon: FaCarSide, label: t("hybrid"), href: "/", color: "teal" },
            ].map((item, index) => (
              <Link key={index} href={item.href}>
                <div className="group cursor-pointer bg-white dark:bg-gray-800 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 rounded-2xl p-6 transition-all duration-300 transform hover:scale-102 hover:shadow-lg text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
                  <div className="relative z-10 flex flex-col items-center space-y-3">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 rounded-xl transition-all duration-300 group-hover:scale-105">
                      <item.icon className="w-7 h-7 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 font-semibold text-sm transition-colors duration-300">
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
      .slider-thumb::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #3b82f6;
        cursor: pointer;
        border: 2px solid #ffffff;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
      }
      
      .slider-thumb::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #3b82f6;
        cursor: pointer;
        border: 2px solid #ffffff;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
      }

      /* Fix for double arrow issue */
      .custom-select {
        background-image: none !important;
        padding-right: 3.5rem; /* Add more padding on the right */
      }
      
      /* Hide default arrow in IE */
      .custom-select::-ms-expand {
        display: none;
      }
    `}</style>
    </section>
  );
};

export default HeroSection;