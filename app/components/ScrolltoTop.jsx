"use client";
import React from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

const ScrolltoTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className="group fixed bottom-10 right-10 w-fit cursor-pointer rounded-full bg-red-500 shadow-lg dark:bg-gray-700"
      onClick={scrollToTop}
      style={{ zIndex: 99 }}
    >
      <div className="flex items-center gap-3 p-5">
        <FaLongArrowAltUp fontSize={25} color="white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold text-white transition-all duration-300 ease-in-out group-hover:max-w-xs">
          Scroll to top
        </span>
      </div>
    </div>
  );
};

export default ScrolltoTop;
