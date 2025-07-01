"use client";
import SidebarFilters from "@/app/components/SidebarFilters";
import { useState } from "react";
import { useTranslations } from "next-intl";
import CardetailCard from "@/app/components/LeasingCarsDetail";

export default function Home() {
  const t = useTranslations("carLeasing");
  return (
    <section className="mx-4 my-10 sm:mx-8">
      <div className="relative mt-4 flex flex-wrap justify-between gap-5 md:flex-nowrap">
        <div className="w-full md:w-2/5">
          <SidebarFilters />
        </div>
        <div className="w-full md:w-5/6">
          <div>
            <CardetailCard />
          </div>
        </div>
      </div>
    </section>
  );
}
