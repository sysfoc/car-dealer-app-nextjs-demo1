"use client";
import SidebarFilters from "@/app/components/SidebarFilters";
import CardetailCard from "@/app/components/CardetailCard";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    async function fetchCars() {
      const res = await fetch("/api/cars"); // Replace with your API route
      const data = await res.json();
      console.log("API Response:", data); // Debug log

      if (data.cars && Array.isArray(data.cars)) {
        setCars(data.cars);
        setFilteredCars(data.cars);
        setLoading(false);
      } else {
        console.error(
          "Invalid response format: `cars` is missing or not an array",
        );
        setCars([]);
        setFilteredCars([]);
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = cars;

      if (filters.keyword) {
        filtered = filtered.filter((car) =>
          car.make.toLowerCase().includes(filters.keyword.toLowerCase()),
        );
      }

      if (filters.condition?.length) {
        filtered = filtered.filter((car) => {
          console.log("Condition Filter:", car.condition, filters.condition);
          return filters.condition.includes(car.condition);
        });
      }

      if (filters.location?.length) {
        filtered = filtered.filter((car) => {
          console.log("Location Filter:", car.location, filters.location);
          return filters.location.includes(car.location);
        });
      }

      setFilteredCars(filtered);
    };
    applyFilters();
  }, [filters, cars]);

  return (
    <section className="mx-4 my-10 sm:mx-8">
      <div className="relative mt-5 flex flex-wrap justify-between gap-5 md:flex-nowrap">
        <div className="w-full md:w-2/5">
          <SidebarFilters onFiltersChange={setFilters} />
        </div>
        <div className="w-full md:w-5/6">
          {loading ? (
            <div>Loading...</div>
          ) : Array.isArray(filteredCars) && filteredCars.length > 0 ? (
            <CardetailCard
              cars={filteredCars.slice(
                (currentPage - 1) * 10,
                currentPage * 10,
              )}
              totalCars={filteredCars.length}
            />
          ) : (
            <p>No cars found.</p>
          )}

          <div className="mt-5 flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredCars.length / 10)}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </div>
      </div>
    </section>
  );
}
