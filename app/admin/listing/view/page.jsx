"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Image from "next/image";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Listing() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/cars/${id}`, { method: "DELETE" });
      if (response.ok) {
        setCars(cars.filter((car) => car._id !== id));
        alert("Car deleted successfully!");
      } else {
        alert("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars");
        const data = await response.json();
        setCars(data.cars || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (cars.length === 0) {
    return <p>No cars found!</p>;
  }
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">All Listings</h2>
        </div>
        <div>
          <Link
            href={"/admin/listing/add"}
            className="rounded-lg bg-yellow-500 p-3 text-sm text-white"
          >
            Add New
          </Link>
        </div>
      </div>
      <div className="mt-5">
        <Table>
          <TableHead>
            <TableHeadCell>Image first from array</TableHeadCell>
            <TableHeadCell>make</TableHeadCell>
            <TableHeadCell>Model</TableHeadCell>
            <TableHeadCell>price</TableHeadCell>
            <TableHeadCell>year</TableHeadCell>
            <TableHeadCell>UserID</TableHeadCell>
            <TableHeadCell>SLug</TableHeadCell>


            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {cars.map((car) => (
              <TableRow
                key={car._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell>
                  <Image
                    src={car.imageUrls?.[0] || "/Luxury SUV.webp"}
                    width={80}
                    height={80}
                    alt={car.make}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell>{car.make}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.price}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.userId?.toString()}</TableCell>
                <TableCell>{car.slug}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-x-5">
                    <Link
                      href={`/admin/listing/edit/${car._id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(car._id)}
                      className="font-medium text-red-500 hover:underline dark:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
