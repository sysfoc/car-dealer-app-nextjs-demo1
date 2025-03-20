"use client";
import { useEffect, useState } from "react";
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
import { toast } from "react-toastify";

export default function Page() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch("/api/brand");
      if (!response.ok) {
        throw new Error("Failed to fetch brands");
      }
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBrand = async (brandId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this brand?",
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/brand/${brandId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to delete brand");
      } else {
        toast.success("Brand deleted successfully!");
        setBrands((prevBrands) =>
          prevBrands.filter((brand) => brand._id !== brandId),
        );
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Listing Brands</h2>
        <Link
          href="/admin/listing/brand/add"
          className="rounded-lg bg-yellow-500 p-3 text-sm text-white"
        >
          Add New
        </Link>
      </div>

      <div className="mt-5">
        {loading ? (
          <p>Loading brands...</p>
        ) : brands.length === 0 ? (
          <p>No brands found.</p>
        ) : (
          <Table>
            <TableHead>
              <TableHeadCell>Serial</TableHeadCell>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Slug</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {brands.map((brand, index) => (
                <TableRow key={brand._id} className="bg-white dark:bg-gray-800">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Image
                      src={brand.logo}
                      width={80}
                      height={80}
                      alt={brand.name}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>{brand.slug}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-5">
                      <Link
                        href={`/admin/listing/brand/edit/${brand._id}`}
                        className="font-medium text-cyan-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        className="font-medium text-red-500 hover:underline"
                        onClick={() => deleteBrand(brand._id)}
                      >
                        Delete
                      </button>
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
