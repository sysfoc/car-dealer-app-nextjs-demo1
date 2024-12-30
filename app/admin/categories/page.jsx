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
      <h2 className="text-2xl font-bold">Blog Categories</h2>
      <div className="mt-5">
        <Table>
          <TableHead>
            <TableHeadCell>Featured Photo</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Slug</TableHeadCell>
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
              <TableCell>First Category</TableCell>
              <TableCell>first-slug</TableCell>
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
              <TableCell>Second Category</TableCell>
              <TableCell>second-slug</TableCell>
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
              <TableCell>Third Category</TableCell>
              <TableCell>third-slug</TableCell>
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
              <TableCell>Fourth Category</TableCell>
              <TableCell>fourth-slug</TableCell>
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
