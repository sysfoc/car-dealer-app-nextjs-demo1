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

export default function Page() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  useEffect(() => {
    fetch(`/api/auth/user`)
      .then((res) => res.json())
      .then((data) => setLoggedInUser(data.user))
      .catch((err) => console.error("Error fetching logged-in user:", err));

    fetch(`/api/users?page=${currentPage}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, [currentPage]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Manage Users</h2>

      <div className="mt-5">
        <Table>
          <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Password</TableHeadCell>
            {loggedInUser?.role === "superadmin" && (
              <TableHeadCell>Delete</TableHeadCell>
            )}
          </TableHead>
          <TableBody className="divide-y">
            {users.map((user) => (
              <TableRow
                key={user._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                {loggedInUser?.role === "superadmin" && (
                  <TableCell>
                    <Link
                      href="#"
                      className="font-medium text-red-500 hover:underline dark:text-red-500"
                    >
                      Delete
                    </Link>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="mt-5 flex justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
