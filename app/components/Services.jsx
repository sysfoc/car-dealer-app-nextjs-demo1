"use client";
import { Button } from "flowbite-react";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

const Services = () => {
  return (
    <section className="mx-4 my-10 sm:mx-8 md:my-20">
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2">
        <div className="rounded-xl bg-green-200 p-8 dark:bg-gray-700 md:p-16">
          <div>
            <h3 className="text-3xl font-semibold">
              Are You Looking For a Car ?
            </h3>
          </div>
          <div className="my-5">
            <p>
              We are committed to providing our customers with exceptional
              service.
            </p>
          </div>
          <div>
            <Button color={"blue"}>
              Get Started <MdOutlineArrowOutward className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="rounded-xl bg-blue-300 p-8 dark:bg-gray-700 md:p-16">
          <div>
            <h3 className="text-3xl font-semibold">
              Do You Want to Sell a Car ?
            </h3>
          </div>
          <div className="my-5">
            <p>
              We are committed to providing our customers with exceptional
              service.
            </p>
          </div>
          <div>
            <Button color={"dark"}>
              Get Started <MdOutlineArrowOutward className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
