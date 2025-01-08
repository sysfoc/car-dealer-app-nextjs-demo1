import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
export default function Page() {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Social Media Items</h2>
      <div className="mt-5">
        <Table>
          <TableHead>
            <TableHeadCell>Serial</TableHeadCell>
            <TableHeadCell>URL</TableHeadCell>
            <TableHeadCell>Icon</TableHeadCell>
            <TableHeadCell>Order</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>1</TableCell>
              <TableCell> https://www.facebook.com/</TableCell>
              <TableCell>
                <FaFacebookF fontFamily="20" />
              </TableCell>
              <TableCell>1</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-5">
                  <Link
                    href="/admin/setting/social/edit/1"
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
              <TableCell>2</TableCell>
              <TableCell> https://www.twitter.com</TableCell>
              <TableCell>
                <FaTwitter fontFamily="20" />
              </TableCell>
              <TableCell>2</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-5">
                  <Link
                    href="/admin/setting/social/edit/1"
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
              <TableCell>3</TableCell>
              <TableCell>https://www.linkedin.com</TableCell>
              <TableCell>
                <FaLinkedin fontFamily="20" />
              </TableCell>
              <TableCell>3</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-5">
                  <Link
                    href="/admin/setting/social/edit/1"
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
              <TableCell>4</TableCell>
              <TableCell> https://www.pinterest.com</TableCell>
              <TableCell>
                <FaPinterest fontFamily="20" />
              </TableCell>
              <TableCell>4</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-5">
                  <Link
                    href="/admin/setting/social/edit/1"
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
