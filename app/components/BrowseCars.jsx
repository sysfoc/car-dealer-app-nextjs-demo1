"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaCar, FaCarRear } from "react-icons/fa6";
import { FaCarAlt } from "react-icons/fa";
import { IoCarSport, IoCar } from "react-icons/io5";
import { BsCarFrontFill } from "react-icons/bs";
import { LiaCarSideSolid } from "react-icons/lia";
import { MdElectricCar, MdCarCrash } from "react-icons/md";
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaShuttleVan,
  FaCarSide,
} from "react-icons/fa";
import { TbCarSuv } from "react-icons/tb";
import { GiSurferVan } from "react-icons/gi";
import { useTranslations } from "next-intl";

const BrowseCars = () => {
  const t = useTranslations("HomePage");
  const allItems = [
    { category: "Automatic Cars", icon: <FaCar fontSize={28} /> },
    { category: "Family Cars", icon: <FaCarAlt fontSize={28} /> },
    { category: "Sports Cars", icon: <IoCarSport fontSize={28} /> },
    { category: "Electric Cars", icon: <MdElectricCar fontSize={28} /> },
    { category: "5 Seaters", icon: <FaShuttleVan fontSize={28} /> },
    { category: "Small Cars", icon: <FaCarSide fontSize={28} /> },
    { category: "Classic Cars", icon: <FaShuttleVan fontSize={28} /> },
    { category: "AWD/4WD", icon: <GiSurferVan fontSize={28} /> },
    { category: "SUV", icon: <TbCarSuv fontSize={28} /> },
    { category: "Commercial", icon: <FaCarRear fontSize={28} /> },
    { category: "5 Doors", icon: <FaCar fontSize={28} /> },
    { category: "Low Priced Cars", icon: <IoCar fontSize={28} /> },
    { category: "Low Mileage Cars", icon: <BsCarFrontFill fontSize={28} /> },
    { category: "Hybrid Cars", icon: <LiaCarSideSolid fontSize={28} /> },
    { category: "Diesel Cars", icon: <FaCar fontSize={28} /> },
    { category: "7 Seaters", icon: <GiSurferVan fontSize={28} /> },
    { category: "Modified Cars", icon: <MdCarCrash fontSize={28} /> },
    { category: "Vintage Models", icon: <IoCar fontSize={28} /> },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(6);
  const totalSlides = Math.ceil(allItems.length / itemsPerSlide);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(4);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(8);
      } else {
        setItemsPerSlide(12);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const startIndex = currentSlide * itemsPerSlide;
  const currentItems = allItems.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <section className="relative bg-gradient-to-br from-white via-gray-50/50 to-slate-100/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 mx-4 my-8 sm:mx-8 md:my-2 px-8 py-16 rounded-3xl overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
            {t("browseCarHeading")}
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover your perfect vehicle from our extensive collection of premium cars
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Grid */}
          <div
            className={`grid gap-4 md:gap-6 transition-all duration-500 ${
              itemsPerSlide === 4
                ? "grid-cols-2"
                : itemsPerSlide === 8
                  ? "grid-cols-2 sm:grid-cols-4"
                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            }`}
          >
            {currentItems.map((item, index) => (
              <Link key={index} href={"#"}>
                <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/50 dark:hover:border-blue-600/50 hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden">
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
                    {/* Icon Container */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center group-hover:scale-110 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"></div>
                      <div className="text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 relative z-10">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Category Name */}
                    <div className="space-y-2">
                      <h4 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                        {item.category}
                      </h4>
                      <div className="w-0 group-hover:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto transition-all duration-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-900/50 flex items-center justify-center group"
          >
            <FaLongArrowAltLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
          </button>
          
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-900/50 flex items-center justify-center group"
          >
            <FaLongArrowAltRight className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseCars;
