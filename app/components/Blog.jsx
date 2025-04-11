import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "flowbite";

const Blog = () => {
  const t = useTranslations("HomePage");

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (error) return <div>Error: {error}</div>;

  return (
    <section className="mx-4 my-10 sm:mx-8 md:my-20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold md:text-3xl">
          {t("blogHeading")}
        </h2>
        <Link href={"/blogs"}>
          <p className="inline-flex items-center gap-x-3">
            {t("viewAll")} <MdOutlineArrowOutward />
          </p>
        </Link>
      </div>
      <div className="mt-3 border-b-2 border-gray-300 dark:border-gray-700">
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-solid border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">

        {blogs.map((blog, index) => (
          <div key={blog._id} className="flex h-full flex-col">
            <div className="flex h-full flex-col border border-gray-300 transition-transform duration-300 ease-in-out hover:scale-95">
              <Link href={`/blogs/${blog.slug}`}>
                <Image
                  src={blog.image}
                  alt={`blog-image-${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full"
                  style={{ objectPosition: "center" }}
                />
              </Link>
              <div>
                <Link href={`/blogs/${blog.slug}`} className="hover:underline">
                  <h3 className="p-2 text-lg font-semibold text-blue-950 dark:text-red-500">
                    {blog.h1}
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
