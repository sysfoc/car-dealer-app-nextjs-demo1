"use client";
import React, { useState, useEffect } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

const ScrolltoTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <div
          className="group fixed bottom-8 right-5 w-fit cursor-pointer rounded-full bg-red-500 shadow-lg"
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
      )}
    </div>
  );
};

export default ScrolltoTop;
