"use client";
import { LuCrown } from "react-icons/lu";
import Slider from "@/app/components/Slider";
import Table from "@/app/components/Tables";
import Features from "@/app/components/Features";
import { Button } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Home() {
  const loading = false;

  return (
    <section className="mx-4 my-5 sm:mx-8">
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-3">
        <div className="col-span-2">
          <div className="flex items-center gap-2 bg-blue-950 p-3 dark:bg-gray-700">
            <div>
              <LuCrown fontSize={25} className="text-white" />
            </div>
            <h3 className="text-lg font-bold uppercase text-white">
              Used Vehical
            </h3>
          </div>
          <div>
            <Slider />
          </div>
          <div className="my-5">
            <h3 className="text-2xl font-semibold">
              {
                loading? (
                  <Skeleton height={25} />
                ) : (
                  "2010 Ford Falcon FG XR8 Ute Super Cab 6 Speed Manual Utility"
                )
              }
            </h3>
            <h4 className="my-2 text-3xl font-semibold text-blue-950 dark:text-red-500">
              {
                loading? (
                  <Skeleton width={150} height={25} />
                ) : (
                  "$39,990"
                )
              }
            </h4>
          </div>
          <div>
            <Button
              size={"lg"}
              className="bg-blue-950 text-white dark:bg-gray-700"
            >
              Enquire Now
            </Button>
          </div>
          <div className="mt-3 border-b-2 border-blue-950 dark:border-gray-700"></div>
          <div>
            <Features />
          </div>
        </div>
        <div>
          <Table />
        </div>
      </div>
      <div className="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.9997072499596!2d73.1154986739374!3d30.663348788985527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b76da7fde6c7%3A0x53937ae1a82170a!2sKhan%20bakers!5e1!3m2!1sen!2s!4v1731403934717!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: 0, width: "100%" }}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
