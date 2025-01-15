import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export default function Listing() {
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
            <TableHeadCell>Featured Photo</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Brand</TableHeadCell>
            <TableHeadCell>Location</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Is Featured?</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>
                <Image
                  src={"/Luxury SUV.webp"}
                  width={80}
                  height={80}
                  alt="Image Of Car"
                  style={{ objectPosition: "center" }}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>Sliver</TableCell>
              <TableCell>Laptop</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-5">
                  <Link
                    href="/admin/listing/edit/2"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                  <Link
                    href="#"
                    className="font-medium text-red-500 hover:underline dark:text-red-500"
                  >
                    Delete
                  </Link>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>
                <Image
                  src={"/Luxury SUV.webp"}
                  width={80}
                  height={80}
                  alt="Image Of Car"
                  style={{ objectPosition: "center" }}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>Sliver</TableCell>
              <TableCell>Laptop</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-5">
                  <Link
                    href="/admin/listing/edit/2"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                  <Link
                    href="#"
                    className="font-medium text-red-500 hover:underline dark:text-red-500"
                  >
                    Delete
                  </Link>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>
                <Image
                  src={"/Luxury SUV.webp"}
                  width={80}
                  height={80}
                  alt="Image Of Car"
                  style={{ objectPosition: "center" }}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>Sliver</TableCell>
              <TableCell>Laptop</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-5">
                  <Link
                    href="/admin/listing/edit/2"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                  <Link
                    href="#"
                    className="font-medium text-red-500 hover:underline dark:text-red-500"
                  >
                    Delete
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
