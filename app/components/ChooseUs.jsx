"use client";
import React from "react";
import { BiSolidOffer } from "react-icons/bi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdCleaningServices } from "react-icons/md";

const ChooseUs = () => {
  return (
    <>
      <section className="bg-blue-950 px-4 py-10 dark:bg-gray-700 sm:px-8 md:py-12">
        <div>
          <h2 className="text-3xl font-semibold text-white">Why Choose Us?</h2>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <div>
                <BiSolidOffer fontSize={50} className="text-white" />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-semibold text-white">
                  Special Financing Offers
                </h3>
                <p className="mt-1 text-white">
                  Our stress-free finance department that can find financial
                  solutions.
                </p>
              </div>
            </div>
            <div>
              <div>
                <VscWorkspaceTrusted fontSize={50} className="text-white" />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-semibold text-white">
                  Trusted Car Dealership
                </h3>
                <p className="mt-1 text-white">
                  Our stress-free finance department that can find financial
                  solutions to save.
                </p>
              </div>
            </div>
            <div>
              <div>
                <IoPricetagsOutline fontSize={50} className="text-white" />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-semibold text-white">
                  Transparent Pricing
                </h3>
                <p className="mt-1 text-white">
                  Our stress-free finance department that can find financial
                  solutions to.
                </p>
              </div>
            </div>
            <div>
              <div>
                <MdCleaningServices fontSize={50} className="text-white" />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-semibold text-white">
                  Expert Car Service
                </h3>
                <p className="mt-1 text-white">
                  Our stress-free finance department that can find financial
                  solutions to save.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChooseUs;
