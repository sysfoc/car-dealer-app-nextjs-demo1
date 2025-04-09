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
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await axios.delete("/api/users/delete", {
        data: { userId },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("User deleted successfully!");
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId),
        );
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `/api/users?page=${currentPage}&limit=${limit}`,
          {
            withCredentials: true,
          },
        );

        console.log("API Response:", response.data);
        setUsers(response.data.users || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        toast.error("Error fetching users.");
      }
    };

    fetchUsers();
  }, [currentPage]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Manage Users</h2>

      <div className="mt-5">
        <Table striped>
          <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Password</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username || "No username found"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>******</TableCell>
                  <TableCell>
                    {user?.role === "superadmin" ? (
                      <span className="font-bold text-blue-600">
                        🌟 Super Admin
                      </span>
                    ) : (
                      <span className="font-bold text-gray-600">👤 User</span>
                    )}
                  </TableCell>

                  <TableCell>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
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

        <div className="mt-5 flex justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded bg-blue-700 px-4 py-2 text-white disabled:opacity-80"
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
            className="rounded bg-blue-700 px-4 py-2 text-white disabled:opacity-80"
          >
            Next
          </button>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
