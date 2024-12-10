"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaCar } from "react-icons/fa6";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const BrowseCars = () => {
  const allItems = [
    { category: "Automatic Cars", icon: <FaCar fontSize={30} /> },
    { category: "Family Cars", icon: <FaCar fontSize={30} /> },
    { category: "5 Seaters", icon: <FaCar fontSize={30} /> },
    { category: "Small Cars", icon: <FaCar fontSize={30} /> },
    { category: "Big Cars", icon: <FaCar fontSize={30} /> },
    { category: "Imported Cars", icon: <FaCar fontSize={30} /> },
    { category: "Old Cars", icon: <FaCar fontSize={30} /> },
    { category: "5 Doors", icon: <FaCar fontSize={30} /> },
    { category: "4 Doors", icon: <FaCar fontSize={30} /> },
    { category: "1000cc Cars", icon: <FaCar fontSize={30} /> },
    { category: "1300cc Cars", icon: <FaCar fontSize={30} /> },
    { category: "Japanese Cars", icon: <FaCar fontSize={30} /> },
    { category: "660cc Cars", icon: <FaCar fontSize={30} /> },
    { category: "Low Priced Cars", icon: <FaCar fontSize={30} /> },
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
    <div className="mx-4 my-10 sm:mx-8 md:my-20">
      <h3 className="text-xl font-semibold md:text-3xl">Browse Used Cars</h3>
      <div className="relative mt-5">
        <div
          className={`grid gap-3 ${
            itemsPerSlide === 4
              ? "grid-cols-2"
              : itemsPerSlide === 8
                ? "grid-cols-2 sm:grid-cols-4"
                : "grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
          }`}
        >
          {currentItems.map((item, index) => (
            <Link key={index} href={"#"}>
              <div className="flex flex-col gap-y-3 rounded-lg border border-gray-300 bg-gray-200 px-3 py-8 text-center dark:bg-gray-700">
                <div className="flex items-center justify-center">
                  {item.icon}
                </div>
                <span>{item.category}</span>
              </div>
            </Link>
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 transform rounded-full bg-blue-950 p-3 text-white shadow-md dark:bg-red-500"
        >
          <FaLongArrowAltLeft fontSize={25} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 transform rounded-full bg-blue-950 p-3 text-white shadow-md dark:bg-red-500"
        >
          <FaLongArrowAltRight fontSize={25} />
        </button>
      </div>
    </div>
  );
};

export default BrowseCars;
