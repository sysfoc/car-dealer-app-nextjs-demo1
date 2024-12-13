import React from "react";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Blog = () => {
  const t = useTranslations("HomePage");
  return (
    <section className="mx-4 my-10 sm:mx-8 md:my-20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold md:text-3xl">
          {t("blogHeading")}
        </h2>
        <Link href={"/blogs"}>
          <p className="text-md inline-flex items-center gap-x-3">
            {t("viewAll")} <MdOutlineArrowOutward />
          </p>
        </Link>
      </div>
      <div className="mt-3 border-b-2 border-gray-300 dark:border-gray-700"></div>
      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex h-full flex-col">
          <div className="flex h-full flex-col border border-gray-300 transition-transform duration-300 ease-in-out hover:scale-95">
            <Link href={"#"}>
              <Image
                src={"/sydney.jpg"}
                alt="blog-image"
                width={500}
                height={500}
                className="w-full"
                style={{ objectPosition: 'center' }}
              />
            </Link>
            <div>
              <Link href={"#"} className="hover:underline">
                <h3 className="p-2 text-lg font-semibold text-blue-950 dark:text-red-500">
                  Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem
                  ipsum dolor sit amet.
                </h3>
              </Link>
            </div>
          </div>
        </div>
        <div className="grid h-full gap-3 sm:grid-cols-2">
          <div className="flex flex-col border border-gray-300 transition-transform duration-300 ease-in-out hover:scale-95">
            <Link href={"#"}>
              <Image
                src={"/sydney.jpg"}
                alt="blog-image-2"
                width={500}
                height={500}
                className="w-full"
                style={{ objectPosition: 'center' }}
              />
            </Link>
            <div>
              <Link href={"#"}>
                <h3 className="p-2 font-semibold text-blue-950 dark:text-red-500">
                  Lorem ipsum dolor sit amet
                </h3>
              </Link>
            </div>
          </div>

          <div className="flex flex-col border border-gray-300 transition-transform duration-300 ease-in-out hover:scale-95">
            <Link href={"#"}>
              <Image
                src={"/sydney.jpg"}
                alt="blog-image-3"
                width={500}
                height={500}
                className="w-full"
                style={{ objectPosition: 'center' }}
              />
            </Link>
            <div>
              <Link href={"#"} className="hover:underline">
                <h3 className="p-2 font-semibold text-blue-950 dark:text-red-500">
                  Lorem ipsum dolor sit amet
                </h3>
              </Link>
            </div>
          </div>

          <div className="flex flex-col border border-gray-300 transition-transform duration-300 ease-in-out hover:scale-95">
            <Link href={"#"}>
              <Image
                src={"/sydney.jpg"}
                alt="blog-image-5"
                width={500}
                height={500}
                className="w-full"
                style={{ objectPosition: 'center' }}
              />
            </Link>
            <div>
              <Link href={"#"} className="hover:underline">
                <h3 className="p-2 font-semibold text-blue-950 dark:text-red-500">
                  Lorem ipsum dolor sit amet
                </h3>
              </Link>
            </div>
          </div>

          <div className="flex flex-col border border-gray-300 transition-transform duration-300 ease-in-out hover:scale-95">
            <Link href={"#"}>
              <Image
                src={"/sydney.jpg"}
                alt="blog-image-6"
                width={500}
                height={500}
                className="w-full"
                style={{ objectPosition: 'center' }}
              />
            </Link>
            <div>
              <Link href={"#"} className="hover:underline">
                <h3 className="p-2 font-semibold text-blue-950 dark:text-red-500">
                  Lorem ipsum dolor sit amet
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
