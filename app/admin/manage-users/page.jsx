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
export default function Page() {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Manage Users</h2>
        </div>
      </div>
      <div className="mt-5">
        <Table>
          <TableHead>
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Joined At</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>
                <Image
                  src={"/logo.png"}
                  width={80}
                  height={80}
                  alt="customer-image"
                  objectPosition="center"
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>Peter Smith</TableCell>
              <TableCell>customer@gmail.com</TableCell>
              <TableCell>March 29, 2003</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-5">
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
                  src={"/logo.png"}
                  width={80}
                  height={80}
                  alt="customer-image"
                  objectPosition="center"
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>Peter Smith</TableCell>
              <TableCell>customer@gmail.com</TableCell>
              <TableCell>March 29, 2003</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-5">
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
                  src={"/logo.png"}
                  width={80}
                  height={80}
                  alt="customer-image"
                  objectPosition="center"
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>Peter Smith</TableCell>
              <TableCell>customer@gmail.com</TableCell>
              <TableCell>March 29, 2003</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-5">
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
