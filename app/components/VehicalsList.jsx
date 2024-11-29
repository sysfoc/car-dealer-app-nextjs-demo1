import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VehicalsList = () => {
  const loading = false;
  const vehicals = [
    {
      name: "Audi A6 3.5",
      image: "/Luxury SUV.webp",
      description: "3.5 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
      price: 25000,
      fuelType: "Petrol",
      driven: 50,
      transmission: "Automatic",
      url: "/car-detail/1",
    },
    {
      name: "Audi A6 3.5",
      image: "/Luxury SUV.webp",
      description: "3.5 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
      price: 25000,
      fuelType: "Petrol",
      driven: 25,
      transmission: "Automatic",
      url: "/car-detail/2",
    },
    {
      name: "Audi A6 3.5",
      image: "/Luxury SUV.webp",
      description: "3.5 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
      price: 25000,
      fuelType: "Petrol",
      driven: 30,
      transmission: "Automatic",
      url: "/car-detail/3",
    },
    {
      name: "Audi A6 3.5",
      image: "/Luxury SUV.webp",
      description: "3.5 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
      price: 25000,
      fuelType: "Petrol",
      driven: 60,
      transmission: "Automatic",
      url: "/car-detail/4",
    },
    {
      name: "Audi A6 3.5",
      image: "/Luxury SUV.webp",
      description: "3.5 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
      price: 25000,
      fuelType: "Petrol",
      driven: 70,
      transmission: "Automatic",
      url: "/car-detail/5",
    },
  ];
  return (
    <section className="mx-4 my-10 sm:mx-8 md:my-20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold md:text-3xl">
          Explore All Vehicles
        </h2>
        <Link href={"/car-for-sale"}>
          <p className="text-md inline-flex items-center gap-x-3">
            View All <MdOutlineArrowOutward />
          </p>
        </Link>
      </div>
      <div className="mt-3 border-b-2 border-gray-300 dark:border-gray-700"></div>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? vehicals.map((vehical, index) => (
              <div
                className="overflow-hidden rounded-xl shadow-md dark:bg-gray-700"
                key={index}
              >
                <div>
                  <Skeleton className="h-[230px] w-full" />
                </div>
                <div className="my-3 px-4">
                  <h3 className="text-xl font-semibold">
                    <Skeleton />
                  </h3>
                  <p className="text-md text-sm">
                    <Skeleton />
                  </p>
                  <div className="mt-3 border-b-2 border-gray-100"></div>
                  <div className="my-3 grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <Skeleton circle width={30} height={30} />
                      </div>
                      <p className="mt-2 text-sm">
                        <Skeleton />
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <Skeleton circle width={30} height={30} />
                      </div>
                      <p className="mt-2 text-sm">
                        <Skeleton />
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <Skeleton circle width={30} height={30} />
                      </div>
                      <p className="mt-2 text-sm">
                        <Skeleton />
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 border-b-2 border-gray-100"></div>
                  <div className="my-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">
                        <Skeleton width={70} height={20} />
                      </h4>
                    </div>
                    <div>
                      <Link
                        href={`${vehical.url}`}
                        className="font-semibold text-blue-950 dark:text-red-500"
                      >
                        <p className="inline-flex items-center gap-x-3">
                          View Details <MdOutlineArrowOutward />
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : vehicals.map((vehical, index) => (
              <div
                className="overflow-hidden rounded-xl shadow-md dark:bg-gray-700"
                key={index}
              >
                <div>
                  <Image
                    src={`${vehical.image}`}
                    width={300}
                    height={300}
                    alt="car-1"
                    className="object-fit h-full w-full"
                  />
                </div>
                <div className="my-3 px-4">
                  <h3 className="text-xl font-semibold">{vehical.name}</h3>
                  <p className="text-md text-sm">
                    {vehical.description.slice(0, 26)}...
                  </p>
                  <div className="mt-3 border-b-2 border-gray-100"></div>
                  <div className="my-3 grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <IoSpeedometer fontSize={25} />
                      </div>
                      <p className="mt-2 text-sm">{vehical.driven} Miles</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <GiGasPump fontSize={25} />
                      </div>
                      <p className="mt-2 text-sm">{vehical.fuelType}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <TbManualGearbox fontSize={25} />
                      </div>
                      <p className="mt-2 text-sm">{vehical.transmission}</p>
                    </div>
                  </div>
                  <div className="mt-3 border-b-2 border-gray-100"></div>
                  <div className="my-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">
                        ${vehical.price}
                      </h4>
                    </div>
                    <div>
                      <Link
                        href={`${vehical.url}`}
                        className="font-semibold text-blue-950 dark:text-red-500"
                      >
                        <p className="inline-flex items-center gap-x-3">
                          View Details <MdOutlineArrowOutward />
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default VehicalsList;
