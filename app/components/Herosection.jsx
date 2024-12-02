import Image from "next/image";
import { Button } from "flowbite-react";
import Link from "next/link";
import { TbCarSuv } from "react-icons/tb";
import { FaShuttleVan, FaCarSide } from "react-icons/fa";
import { GiSurferVan } from "react-icons/gi";

const HeroSection = () => {
  return (
    <section className="relative w-full">
      <Image
        src="/Luxury SUV.webp"
        alt="Luxury SUV Background"
        layout="fill"
        objectFit="cover"
        objectPosition="top center"
        className="z-[-1] opacity-80"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative flex w-full items-center justify-center px-5 py-44">
        <div className="w-full sm:w-[80%]">
          <div className="mb-8">
            <p className="text-center text-sm text-white">
              Find cars for sale and for rent near you
            </p>
            <h1 className="mt-3 text-center text-4xl font-semibold text-white sm:my-6 md:text-5xl lg:text-7xl">
              Find Your Perfect Car
            </h1>
          </div>
          <div className="my-5 grid grid-cols-1 items-center gap-3 rounded bg-white px-3 py-4 dark:bg-gray-800 sm:grid-cols-2 md:grid-cols-4 md:rounded-full">
            <div>
              <select
                id="make"
                aria-label="Select car make"
                required
                className="w-full border-0 border-none bg-transparent p-3 focus:ring-0 dark:text-gray-200"
              >
                <option className="dark:bg-gray-800 dark:text-gray-200">
                  Any Makes
                </option>
                <option className="dark:bg-gray-800 dark:text-gray-200">
                  Canada
                </option>
                <option className="dark:bg-gray-800 dark:text-gray-200">
                  France
                </option>
                <option className="dark:bg-gray-800 dark:text-gray-200">
                  Germany
                </option>
              </select>
            </div>
            <div>
              <select
                id="model"
                aria-label="Select car model"
                required
                className="w-full border-0 border-none bg-transparent p-3 focus:ring-0 dark:text-gray-200"
              >
                <option className="dark:bg-gray-800 dark:text-gray-200">
                  Any Models
                </option>
                <option className="dark:bg-gray-800 dark:text-gray-200">
                  Canada
                </option>
                <option className="dark:bg-gray-800 dark:text-gray-200">
                  France
                </option>
                <option className="dark:bg-gray-800 dark:text-gray-200">
                  Germany
                </option>
              </select>
            </div>
            <div>
              <select
                id="price"
                aria-label="Select price range"
                required
                className="w-full border-0 border-none bg-transparent p-3 focus:ring-0 dark:text-gray-200"
              >
                <option className="dark:bg-gray-800 dark:text-gray-200">
                  Price Range
                </option>
                <option className="dark:bg-gray-800 dark:text-gray-200">
                  Canada
                </option>
                <option className="dark:bg-gray-800 dark:text-gray-200">
                  France
                </option>
                <option className="dark:bg-gray-800 dark:text-gray-200">
                  Germany
                </option>
              </select>
            </div>
            <div>
              <Button
                pill
                color={"blue"}
                className="w-full p-2 dark:bg-red-500"
              >
                Search Cars
              </Button>
            </div>
          </div>

          <div className="my-8">
            <p className="text-center text-sm font-semibold text-white">
              Or Browse Featured Model
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <TbCarSuv fontSize={22} />
                    <span className="text-sm">SUV</span>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <FaShuttleVan fontSize={22} />
                    <span className="text-sm">Sedan</span>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <FaCarSide fontSize={22} />
                    <span className="text-sm">Hatchback</span>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <GiSurferVan fontSize={22} />
                    <span className="text-sm">Coupe</span>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="cursor-pointer rounded-full bg-[#f4f4f454] px-5 py-2 text-white">
                  <div className="flex items-center gap-x-2">
                    <FaCarSide fontSize={22} />
                    <span className="text-sm">Hybrid</span>
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
