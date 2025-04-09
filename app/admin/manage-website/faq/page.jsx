"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Link from "next/link";
import Swal from "sweetalert2";
const Page = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch("/api/faq");
        const data = await response.json();
        setFaqs(data.faqs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This FAQ will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });

      if (res.ok) {
        setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "The FAQ has been deleted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the FAQ.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while deleting.",
        icon: "error",
      });
    }
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">FAQ&apos;s Section</h2>
        <Link
          href="/admin/manage-website/faq/add"
          className="rounded-lg bg-yellow-500 p-3 text-sm text-white"
        >
          Add New
        </Link>
      </div>

      <div className="mt-5">
        <Table>
          <TableHead>
            <TableHeadCell>Serial</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Order</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {faqs.map((faq, index) => (
              <TableRow
                key={faq._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{faq.title}</TableCell>
                <TableCell>{faq.order}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-5">
                    <Link
                      href={`/admin/manage-website/faq/edit/${faq._id}`}
                      className="text-cyan-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(faq._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
