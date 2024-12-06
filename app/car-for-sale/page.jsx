"use client";
import SidebarFilters from "@/app/components/SidebarFilters";
import CardetailCard from "@/app/components/CardetailCard";
import { Pagination } from "flowbite-react";
import { useState } from "react";
export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <section className="mx-4 my-10 sm:mx-12">
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
