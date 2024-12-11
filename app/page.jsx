"use client";
import Herosection from "./components/Herosection";
import VehicalsList from "./components/VehicalsList";
import BrandsList from "./components/BrandsList";
import ChooseUs from "./components/ChooseUs";
import Services from "./components/Services";
import BrowseCars from "./components/BrowseCars";
import Blog from "./components/Blog";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { SiGiphy } from "react-icons/si";
import { FaPinterest } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Herosection />
      <BrandsList />
      <BrowseCars />
      <VehicalsList loadingState={loading} />
      <ChooseUs />
      <Services />
      <Blog />
      <section className="mx-4 my-10 py-10 sm:mx-8 md:my-20">
        <h3 className="mt-5 text-center text-3xl font-semibold">
          Follow Us On Social Media
        </h3>
        <p className="mt-3 text-center text-lg">All The Latest News For You</p>
        <div className="flex items-center justify-center">
          <div className="mt-10 grid grid-cols-3 gap-5 sm:grid-cols-5 md:grid-cols-7 md:gap-8">
            <Link
              href={"#"}
              target="_blank"
              className="flex flex-col text-center transition-all duration-300 ease-in-out hover:scale-95 hover:underline"
            >
              <div className="flex items-center justify-center">
                <FaFacebookSquare fontSize={30} />
              </div>
              <span className="mt-2">Facebook</span>
            </Link>
            <Link
              href={"#"}
              target="_blank"
              className="flex flex-col text-center transition-all duration-300 ease-in-out hover:scale-95 hover:underline"
            >
              <div className="flex items-center justify-center">
                <FaYoutube fontSize={30} />
              </div>
              <span className="mt-2">Youtube</span>
            </Link>
            <Link
              href={"#"}
              target="_blank"
              className="flex flex-col text-center transition-all duration-300 ease-in-out hover:scale-95 hover:underline"
            >
              <div className="flex items-center justify-center">
                <FaInstagram fontSize={30} />
              </div>
              <span className="mt-2">Instagram</span>
            </Link>
            <Link
              href={"#"}
              target="_blank"
              className="flex flex-col text-center transition-all duration-300 ease-in-out hover:scale-95 hover:underline"
            >
              <div className="flex items-center justify-center">
                <FaXTwitter fontSize={30} />
              </div>
              <span className="mt-2">Twitter</span>
            </Link>
            <Link
              href={"#"}
              target="_blank"
              className="flex flex-col text-center transition-all duration-300 ease-in-out hover:scale-95 hover:underline"
            >
              <div className="flex items-center justify-center">
                <FaTiktok fontSize={30} />
              </div>
              <span className="mt-2">Tiktok</span>
            </Link>
            <Link
              href={"#"}
              target="_blank"
              className="flex flex-col text-center transition-all duration-300 ease-in-out hover:scale-95 hover:underline"
            >
              <div className="flex items-center justify-center">
                <SiGiphy fontSize={30} />
              </div>
              <span className="mt-2">Giphy</span>
            </Link>
            <Link
              href={"#"}
              target="_blank"
              className="flex flex-col text-center transition-all duration-300 ease-in-out hover:scale-95 hover:underline"
            >
              <div className="flex items-center justify-center">
                <FaPinterest fontSize={30} />
              </div>
              <span className="mt-2">Pinterest</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
