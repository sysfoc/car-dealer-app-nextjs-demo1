"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Image from "next/image";

export default function Page() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars"); // Call API
        const data = await response.json();
        setCars(data.cars); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Manage Listings</h2>
      <div className="mt-5">
        {loading ? (
          <p>Loading...</p>
        ) : cars.length === 0 ? (
          <p>No cars pending approval.</p>
        ) : (
          <Table>
            <TableHead>
              <TableHeadCell>Featured Photo</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Brand</TableHeadCell>
              <TableHeadCell>Location</TableHeadCell>
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
                      src={car.imageUrls?.[0] || "/placeholder.jpg"}
                      width={80}
                      height={80}
                      alt="Car Image"
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{car.name}</TableCell>
                  <TableCell>{car.make}</TableCell>
                  <TableCell>{car.location || "Unknown"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-3">
                      <Button color="warning" size="sm">
                        Unapprove
                      </Button>
                      <Button color="success" size="sm">
                        Approve
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
