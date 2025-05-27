"use client";
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
import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  h1: string;
  title: string;
  slug: string;
  metaDescription: string;
  createdAt: string;
  image: string;
}

export default function Page() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (slug: string) => {
    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      // Update the blogs list after deletion
      // setBlogs(blogs.filter((blog) => blog._id !== id));
      setBlogs(blogs.filter((blog) => blog.slug !== slug));
    } catch (err) {
      console.error("Delete error:", err);
      alert(err instanceof Error ? err.message : "Failed to delete blog");
    }
  };

  if (loading) {
    return <div className="mt-5 text-center">Loading blogs...</div>;
  }

  if (error) {
    return <div className="mt-5 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">All Blogs</h2>
        </div>
        <div>
          <Link
            href={"/admin/blog/create"}
            className="rounded-lg bg-yellow-500 p-3 text-sm text-white"
          >
            Add New
          </Link>
        </div>
      </div>
      <div className="mt-5">
        <Table>
          <TableHead>
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Slug</TableHeadCell>
            <TableHeadCell>Meta Description</TableHeadCell>
            <TableHeadCell>Created At</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {blogs.map((blog) => (
              <TableRow
                key={blog._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell>
                  <Image
                    src={blog.image}
                    width={80}
                    height={80}
                    alt="Blog Image"
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell>{blog.h1}</TableCell>
                <TableCell>{blog.slug}</TableCell>
                <TableCell>{blog.metaDescription}</TableCell>
                <TableCell>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-5">
                    <Link
                      href={`/admin/blog/edit/${blog.slug}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="font-medium text-red-500 hover:underline dark:text-red-500"
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
}
