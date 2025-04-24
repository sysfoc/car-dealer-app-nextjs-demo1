"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useTranslations } from "next-intl";

const BrandsList = () => {
  const t = useTranslations("HomePage");
  const brandLists = [
    {
      name: "BMW",
      image: "/bmw.avif",
      alt: "bmw cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "Bentley",
      image: "/bentley.avif",
      alt: "bentley cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "Honda",
      image: "/honda.avif",
      alt: "honda cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "Hyundai",
      image: "/hyundai.avif",
      alt: "hyundai cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "Kia",
      image: "/kia.avif",
      alt: "Kia cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
  ];
  return (
    <section className="bg-[#F9FBFC] px-4 py-10 dark:bg-gray-800 sm:px-8 md:py-20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold md:text-3xl">
          {t("brandHeading")}
        </h2>
        <Link href={"/brands"}>
          <p className="inline-flex items-center gap-x-3">
            {t("viewAll")} <MdOutlineArrowOutward />
          </p>
        </Link>
      </div>
      <div className="mt-3 border-b-2 border-gray-300 dark:border-gray-700"></div>
      <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {brandLists.map((brand, index) => (
          <div
            className="rounded-xl border border-gray-100 bg-white p-5 transition-all delay-75 hover:border-blue-600 dark:bg-gray-700"
            key={index}
          >
            <Link href={`${brand.url}`}>
              <div>
                <div>
                  <Image
                    src={`${brand.image}`}
                    alt={`${brand.alt}`}
                    width={200}
                    height={200}
                    style={{ objectPosition: "center" }}
                    className="size-full"
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
