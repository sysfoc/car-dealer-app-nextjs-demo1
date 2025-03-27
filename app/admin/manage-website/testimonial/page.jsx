"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

const Page = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonial");
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/testimonial/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete testimonial");
          }

          setTestimonials(testimonials.filter((t) => t._id !== id));

          Swal.fire(
            "Deleted!",
            "Your testimonial has been deleted.",
            "success",
          );
        } catch (error) {
          console.error("Error deleting testimonial:", error);
          Swal.fire("Error!", "Failed to delete testimonial.", "error");
        }
      }
    });
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Testimonial Section</h2>
        </div>
        <div>
          <Link
            href={"/admin/manage-website/testimonial/add"}
            className="rounded-lg bg-yellow-500 p-3 text-sm text-white"
          >
            Add New
          </Link>
        </div>
      </div>
      <div className="mt-5">
        <Table>
          <TableHead>
            <TableHeadCell>Serial</TableHeadCell>
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Designation</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <TableRow
                  key={testimonial._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Image
                      src={testimonial.image}
                      width={80}
                      height={80}
                      alt={testimonial.name}
                      objectPosition="center"
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{testimonial.name}</TableCell>
                  <TableCell>{testimonial.designation}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-5">
                      <Link
                        href={`/admin/manage-website/testimonial/edit/${testimonial._id}`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(testimonial._id)}
                        className="font-medium text-red-500 hover:underline dark:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center">
                  No Testimonials Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
