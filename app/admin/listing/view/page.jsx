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
      <h2 className="text-2xl font-bold">Listings</h2>
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
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell>Sliver</TableCell>
              <TableCell>Laptop</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>
                <Link
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>
                <Image
                  src={"/Luxury SUV.webp"}
                  width={80}
                  height={80}
                  alt="Image Of Car"
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell>Sliver</TableCell>
              <TableCell>Laptop</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>
                <Link
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>
                <Image
                  src={"/Luxury SUV.webp"}
                  width={80}
                  height={80}
                  alt="Image Of Car"
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell>Sliver</TableCell>
              <TableCell>Laptop</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>
                <Link
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
