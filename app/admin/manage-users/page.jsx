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
import axios from "axios"; // ✅ Import axios

export default function Page() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Users per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `/api/users?page=${currentPage}&limit=${limit}`,
          {
            withCredentials: true, // ✅ Ensures cookies are sent
          },
        );

        console.log("API Response:", response.data);
        setUsers(response.data.users || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Ensure users is always an array
      }
    };

    fetchUsers();
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
            <TableHeadCell>Delete</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username || "No username found"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>******</TableCell> {/* ✅ Hide password */}
                  <TableCell>
                    <Link href="#" className="text-red-500 hover:underline">
                      Delete
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            )}
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
