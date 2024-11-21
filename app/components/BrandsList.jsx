import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

const BrandsList = () => {
  const brandLists = [
    {
      name: "BMW",
      image: "/bmw.avif",
      url: "/",
    },
    {
      name: "Bentley",
      image: "/bentley.avif",
      url: "/",
    },
    {
      name: "Honda",
      image: "/honda.avif",
      url: "/",
    },
    {
      name: "Hyundai",
      image: "/hyundai.avif",
      url: "/",
    },
    {
      name: "Kia",
      image: "/kia.avif",
      url: "/",
    },
  ];
  return (
    <section className="bg-[#F9FBFC] px-4 py-10 dark:bg-gray-800 sm:px-8 md:py-20">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl md:text-3xl font-semibold">Explore Our Premium Brands</h2>
        <Link href={"/"}>
          <p className="text-md inline-flex items-center gap-x-3">
            Show All Brands <MdOutlineArrowOutward />
          </p>
        </Link>
      </div>
      <div className="mt-3 border-b-2 border-gray-300"></div>
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {brandLists.map((brand, index) => (
          <div className="rounded-xl border border-gray-100 bg-white p-5 transition-all delay-75 hover:border-blue-600 dark:bg-gray-700" key={index}>
            <Link href={`${brand.url}`}>
              <div>
                <div>
                  <Image
                    src={`${brand.image}`}
                    alt={`${brand.name}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-center text-lg">{brand.name}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandsList;
