"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaCar } from "react-icons/fa6";
import { FaCarAlt } from "react-icons/fa";
import { FaCarRear } from "react-icons/fa6";
import { IoCarSport } from "react-icons/io5";
import { IoCar } from "react-icons/io5";
import { BsCarFrontFill } from "react-icons/bs";
import { LiaCarSideSolid } from "react-icons/lia";
import { MdElectricCar } from "react-icons/md";
import { MdCarCrash } from "react-icons/md";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { TbCarSuv } from "react-icons/tb";
import { FaShuttleVan, FaCarSide } from "react-icons/fa";
import { GiSurferVan } from "react-icons/gi";
import { useTranslations } from "next-intl";

const BrowseCars = () => {
  const t = useTranslations("HomePage");
  const allItems = [
    { category: "Automatic Cars", icon: <FaCar fontSize={30} /> },
    { category: "Family Cars", icon: <FaCarAlt fontSize={30} /> },
    { category: "Sports Cars", icon: <IoCarSport fontSize={30} /> },
    { category: "Electric Cars", icon: <MdElectricCar fontSize={30} /> },
    { category: "5 Seaters", icon: <FaShuttleVan fontSize={30} /> },
    { category: "Small Cars", icon: <FaCarSide fontSize={30} /> },
    { category: "Classic Cars", icon: <FaShuttleVan fontSize={30} /> },
    { category: "AWD/4WD", icon: <GiSurferVan fontSize={30} /> },
    { category: "SUV", icon: <TbCarSuv fontSize={30} /> },
    { category: "Commercial", icon: <FaCarRear fontSize={30} /> },
    { category: "5 Doors", icon: <FaCar fontSize={30} /> },
    { category: "Low Priced Cars", icon: <IoCar fontSize={30} /> },
    { category: "Low Mileage Cars", icon: <BsCarFrontFill fontSize={30} /> },
    { category: "Hybrid Cars", icon: <LiaCarSideSolid fontSize={30} /> },
    { category: "Diesel Cars", icon: <FaCar fontSize={30} /> },
    { category: "7 Seaters", icon: <GiSurferVan fontSize={30} /> },
    { category: "Modified Cars", icon: <MdCarCrash fontSize={30} /> },
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
      <h3 className="text-xl font-semibold md:text-3xl">{t('browseCarHeading')}</h3>
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
              <div className="flex flex-col gap-y-3 rounded-lg border border-gray-300 bg-gray-200 px-3 py-8 text-center transition-transform duration-300 ease-in-out hover:scale-95 hover:bg-gray-100 hover:shadow-lg dark:bg-gray-700">
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
          aria-label="Previous Slide"
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 transform rounded-full bg-blue-950 p-3 text-white shadow-md dark:bg-red-500"
        >
          <span className="sr-only">Previous Slide</span>
          <FaLongArrowAltLeft fontSize={25} />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 transform rounded-full bg-blue-950 p-3 text-white shadow-md dark:bg-red-500"
        >
          <span className="sr-only">Next Slide</span>
          <FaLongArrowAltRight fontSize={25} />
        </button>
      </div>
    </div>
  );
};

export default BrowseCars;
