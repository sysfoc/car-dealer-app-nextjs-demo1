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
      name: "Audi",
      image: "/audi.png",
      alt: "audi cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "BYD",
      image: "/byd.png",
      alt: "byd cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "Ford",
      image: "/ford.png",
      alt: "ford cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "GWM",
      image: "/gwm.png",
      alt: "gwm cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "Jaguar",
      image: "/jaguar.png",
      alt: "jaguar cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "Lexus",
      image: "/lexus.jpg",
      alt: "lexus cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "Mercedes",
      image: "/mercedes.jpg",
      alt: "mercedes cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "Porsche",
      image: "/porsche.png",
      alt: "porsche cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "Tesla",
      image: "/tesla.png",
      alt: "tesla cars",
      url: "https://car-dealer-app-nextjs1-43h7ls7h5-sysfocs-projects.vercel.app/car-for-sale",
    },
    {
      name: "Toyota",
      image: "/toyota.png",
      alt: "toyota cars",
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

  // Duplicate the brands array to create seamless loop
  const duplicatedBrands = [...brandLists, ...brandLists];

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-16 sm:px-8 md:pt-20 md:pb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/20 dark:bg-purple-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
              {t("brandHeading")}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>

          <Link href={"/brands"}>
            <div className="group inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 rounded-2xl px-6 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105">
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                {t("viewAll")}
              </span>
              <MdOutlineArrowOutward className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </Link>
        </div>

        {/* Sliding Brands Container */}
        <div className="relative overflow-hidden">
          {/* Sliding wrapper with continuous animation */}
          <div className="flex animate-slide min-w-max hover:pause-animation">
            {duplicatedBrands.map((brand, index) => (
              <Link href={brand.url} key={index} className="flex-shrink-0">
                <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 mx-4 w-48 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/50 dark:hover:border-blue-600/50 hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden">
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center space-y-4">
                    {/* Image Container */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-3 group-hover:scale-110 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                      <Image
                        src={brand.image}
                        alt={brand.alt}
                        width={100}
                        height={100}
                        className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: "center" }}
                      />
                    </div>

                    {/* Brand Name */}
                    <div className="text-center">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {brand.name}
                      </h3>
                      <div className="w-0 group-hover:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-2 transition-all duration-500 rounded-full"></div>
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
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full opacity-30"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slide {
  display: flex;
  width: 200%;
  animation: slide 60s linear infinite;
}
        
        .pause-animation {
          animation-play-state: paused;
        }
          .hover\:pause-animation:hover {
  animation-play-state: paused;
}
      `}</style>
    </section>
  );
};

export default BrandsList;