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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars");
        const data = await response.json();
        setCars(data.cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);
  const handleStatusChange = async (carId, newStatus) => {
    try {
      const response = await fetch("/api/cars", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId, status: newStatus }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      toast.success(data.message);
      setCars((prevCars) =>
        prevCars.map((car) =>
          car._id === carId ? { ...car, status: newStatus } : car,
        ),
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

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
              <TableHeadCell>UserID</TableHeadCell>
              <TableHeadCell>SLug</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
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
                  <TableCell>{car.modelName}</TableCell>
                  <TableCell>{car.makeName}</TableCell>
                  <TableCell>{car.location || "Unknown"}</TableCell>
                  <TableCell>{car.userId}</TableCell>
                  <TableCell>{car.slug}</TableCell>
                  <TableCell>
                    {car.status === 1 ? (
                      <span className="font-bold text-green-600">
                        ✅ Approved
                      </span>
                    ) : (
                      <span className="font-bold text-red-600">
                        ❌ Unapproved
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-x-3">
                      {car.status === 1 ? (
                        <Button
                          color="warning"
                          size="sm"
                          onClick={() => handleStatusChange(car._id, 0)}
                        >
                          Unapprove
                        </Button>
                      ) : (
                        <Button
                          color="success"
                          size="sm"
                          onClick={() => handleStatusChange(car._id, 1)}
                        >
                          Approve
                        </Button>
                      )}
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
