"use client";
import { Pagination } from "flowbite-react";
import LeasingCarsDetail from "@/app/components/LeasingCarsDetail";
import SidebarFilters from "@/app/components/SidebarFilters";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  return (
    <section className="mx-4 my-10 sm:mx-8">
      <div className="relative mt-4 flex flex-wrap justify-between gap-5 md:flex-nowrap">
        <div className="w-full md:w-2/5">
          <SidebarFilters />
        </div>
        <div className="w-full md:w-5/6">
          <div>
            <h2 className="mt-4 text-3xl">
              <strong className="text-blue-950 dark:text-red-500">41</strong>{" "}
              car lease deals for{" "}
              <strong className="text-blue-950 dark:text-red-500">
                Audi A8
              </strong>{" "}
              available
            </h2>
            <p className="my-2 text-lg">
              Results are based on the lowest monthly prices available. Terms
              for each vehicle may vary.
            </p>
          </div>
          <div>
            <LeasingCarsDetail />
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
      </div>
    </section>
  );
}
