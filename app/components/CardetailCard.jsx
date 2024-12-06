"use client";
import { Button, Carousel, Select } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GrSort } from "react-icons/gr";
import { FiGrid, FiList } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";

const CardetailCard = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const togglePopup = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const loading = false;

  const vehicalImages = [
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
  ];

  return (
    <>
      <div className="mb-2 flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700">
        <div>
          <span className="text-sm">
            <strong>4</strong> out of <strong>500</strong> results
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <Select icon={GrSort}>
            <option value="recent">Updated Date: Recent First</option>
            <option value="oldest">Updated Date: Oldest First</option>
            <option value="price-lh">Price: Low to High</option>
            <option value="price-hl">Price: High to Low</option>
            <option value="model-latest">Model Year: Latest First</option>
            <option value="model-oldest">Model Year: Oldest First</option>
            <option value="mileage-lh">Mileage: Low to Hight</option>
            <option value="mileage-hl">Mileage: High to Low</option>
          </Select>
          <Button color={"light"} onClick={() => setIsGridView(!isGridView)}>
            {isGridView ? <FiList fontSize={20} /> : <FiGrid fontSize={20} />}
          </Button>
        </div>
      </div>

      <div
        className={`${
          isGridView
            ? "grid grid-cols-1 gap-5 md:grid-cols-2 "
            : "grid grid-cols-1 space-y-5"
        }`}
      >
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`relative rounded-lg shadow-lg dark:bg-gray-700 ${
              isGridView ? "" : "flex flex-col gap-x-3 md:flex-row"
            }`}
          >
            <div
              className={`mt-3 ${isGridView ? "h-48 sm:h-64" : "h-48 w-full md:h-56 md:w-1/2"}`}
            >
              <Carousel slideInterval={3000}>
                {vehicalImages.map((image, i) => {
                  return loading ? (
                    <Skeleton key={i} width={500} height={300} />
                  ) : (
                    <Image
                      key={i}
                      src={image.name}
                      alt={image.alt}
                      width={300}
                      height={200}
                      className={`${isGridView ? "" : "rounded-md"}`}
                    />
                  );
                })}
              </Carousel>
            </div>
            <span className="absolute left-2 top-3 rounded bg-blue-950 px-3 py-1 text-sm uppercase text-white dark:bg-red-500">
              New
            </span>
            <div className="p-4">
              <div>
                <Link
                  href="/car-detail/1"
                  className="hover:text-blue-950 hover:underline dark:hover:text-red-500"
                >
                  <h3 className="font-bold uppercase">
                    {loading ? (
                      <Skeleton height={25} />
                    ) : (
                      "1996 Mercury Cougar XR7"
                    )}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold text-blue-950 dark:text-red-500">
                    {loading ? <Skeleton height={25} width={100} /> : "$3,500"}
                  </h4>
                  <div>
                    <Button color={"white"}>
                      <CiHeart fontSize={22} />
                    </Button>
                  </div>
                </div>
                <div
                  className={`mt-2 ${
                    isGridView
                      ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
                      : "grid grid-cols-1 gap-3 sm:grid-cols-2"
                  }`}
                >
                  <span className="text-sm">
                    {loading ? (
                      <Skeleton height={20} />
                    ) : (
                      "Light Saddle Cc Met Exterior"
                    )}
                  </span>
                  <span className="text-sm">
                    {loading ? (
                      <Skeleton height={20} />
                    ) : (
                      "Light Saddle Cc Met Exterior"
                    )}
                  </span>
                  <span className="text-sm">
                    {loading ? (
                      <Skeleton height={20} />
                    ) : (
                      "Light Saddle Cc Met Exterior"
                    )}
                  </span>
                  <span className="text-sm">
                    {loading ? (
                      <Skeleton height={20} />
                    ) : (
                      "Light Saddle Cc Met Exterior"
                    )}
                  </span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-3">
                <Link href={"#"} className="flex flex-col">
                  <Button
                    color={"white"}
                    className="border border-blue-950 text-sm uppercase hover:bg-blue-950 hover:text-white dark:border-red-500 dark:hover:bg-red-500"
                  >
                    Enquire Now
                  </Button>
                </Link>
                <Link href={"#"} className="flex flex-col">
                  <Button
                    color={"white"}
                    className="bg-blue-950 text-sm uppercase text-white dark:bg-red-500"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardetailCard;
