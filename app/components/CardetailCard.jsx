import { Carousel } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardetailCard = () => {
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
    <div className="rounded shadow-lg dark:bg-gray-700">
      <div className="mt-3 h-48 sm:h-64 xl:h-56 2xl:h-96">
        <Carousel slideInterval={3000}>
          {vehicalImages.map((image, index) => {
            return loading ? (
              <Skeleton key={index} width={500} height={300} />
            ) : (
              <Image
                key={index}
                src={image.name}
                alt={image.alt}
                width={300}
                height={200}
              />
            );
          })}
        </Carousel>
      </div>
      <div className="p-4">
        <div>
          <Link href="#">
            <h3 className="font-bold uppercase">
              {loading ? <Skeleton height={25} /> : "1996 Mercury Cougar XR7"}
            </h3>
          </Link>
          <h4 className="text-2xl font-bold text-blue-950 dark:text-red-500">
            {loading ? <Skeleton height={25} width={100} /> : "$3,500"}
          </h4>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <span className="text-sm">
                {loading ? (
                  <Skeleton height={20} />
                ) : (
                  "Light Saddle Cc Met Exterior"
                )}
              </span>
            </div>
            <div>
              <span className="text-sm">
                {loading ? (
                  <Skeleton height={20} />
                ) : (
                  "Light Saddle Cc Met Exterior"
                )}
              </span>
            </div>
            <div>
              <span className="text-sm">
                {loading ? (
                  <Skeleton height={20} />
                ) : (
                  "Light Saddle Cc Met Exterior"
                )}
              </span>
            </div>
            <div>
              <span className="text-sm">
                {loading ? (
                  <Skeleton height={20} />
                ) : (
                  "Light Saddle Cc Met Exterior"
                )}
              </span>
            </div>
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
  );
};

export default CardetailCard;
