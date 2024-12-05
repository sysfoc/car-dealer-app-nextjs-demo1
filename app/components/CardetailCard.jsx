"use client";

import { Button, Carousel, Select } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GrSort } from "react-icons/gr";
import { FiGrid, FiList } from "react-icons/fi";

const CardetailCard = () => {
  const [isGridView, setIsGridView] = useState(true);
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
      <div className="mb-2 flex items-center justify-end">
        <div className="flex items-center gap-x-3">
          <Select icon={GrSort}>
            <option value="ascending">Ascending</option>
            <option value="decending">Decending</option>
            <option value="price">Price</option>
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
            className={`rounded-lg shadow-lg dark:bg-gray-700 ${
              isGridView ? "" : "flex gap-x-3"
            }`}
          >
            <div
              className={`mt-3 ${isGridView ? "h-48 sm:h-64" : "w-[250px] md:w-1/2"}`}
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
            <div className="p-4">
              <div>
                <Link href="#">
                  <h3 className="font-bold uppercase">
                    {loading ? (
                      <Skeleton height={25} />
                    ) : (
                      "1996 Mercury Cougar XR7"
                    )}
                  </h3>
                </Link>
                <h4 className="text-2xl font-bold text-blue-950 dark:text-red-500">
                  {loading ? <Skeleton height={25} width={100} /> : "$3,500"}
                </h4>
                <div
                  className={`mt-3 ${
                    isGridView
                      ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
                      : "hidden grid-cols-1 gap-3 sm:grid sm:grid-cols-2"
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
                <div className="mt-5 flex flex-col">
                  <Link
                    href="/car-detail/1"
                    className="bg-blue-950 px-3 py-2 text-center uppercase text-white transition-all dark:bg-red-500"
                  >
                    Get Todays Price
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardetailCard;
