"use client";
import Searchbar from "@/app/components/Searchbar";
import SidebarFilters from "@/app/components/SidebarFilters";
import CardetailCard from "@/app/components/CardetailCard";
import { Pagination } from "flowbite-react";
import { useState } from "react";
export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <section className="mx-4 my-10 sm:mx-16">
      <div>
        <h2 className="text-center text-3xl font-bold uppercase text-blue-950 dark:text-gray-300 sm:text-4xl">
          New & Used Cars For Sale
        </h2>
        <p className="mt-4">
          If you are searching for a used car for sale look no further than
          AutoNation USA. We offer a variety of used car models in stock and
          available to purchase now. All of our used cars for sale feature the
          AutoNation 1Price, our low, haggle-free price, and have been inspected
          by one of our trained technicians to ensure they are in great shape.
          Browse used cars for sale, then find your local AutoNation USA used
          car dealership to schedule a test drive. We hope to see you soon!
        </p>
      </div>
      <div className="my-5">
        <Searchbar />
      </div>
      <div className="relative mt-5 flex flex-wrap justify-between gap-5 md:flex-nowrap">
        <div className="w-full md:w-2/5">
          <SidebarFilters />
        </div>
        <div className="w-full md:w-5/6">
          <CardetailCard />
          <div className="mt-5 flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={8}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </div>
      </div>
    </section>
  );
}
