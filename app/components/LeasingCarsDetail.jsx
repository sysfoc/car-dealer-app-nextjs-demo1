import Image from "next/image";
import React from "react";
import { IoSpeedometer } from "react-icons/io5";
import { GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { GiCarDoor } from "react-icons/gi";
import { GiCarSeat } from "react-icons/gi";
import { GiPathDistance } from "react-icons/gi";
import { Badge } from "flowbite-react";

const LeasingCarsDetail = () => {
  return (
    <div className="border border-gray-200 shadow-md">
      <div>
        <Image
          src={"/Luxury SUV.webp"}
          alt="car-image"
          width={500}
          height={300}
          className="h-full w-full"
        />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap justify-between gap-3">
          <div>
            <p>From</p>
            <h3 className="text-2xl font-bold text-blue-950 dark:text-red-500">
              $300
            </h3>
            <small>Per month inc. VAT</small>
          </div>
          <div className="flex flex-col">
            <small>
              <strong>$60</strong> initial payment
            </small>
            <small>
              <strong>60</strong> months contract
            </small>
            <small>
              <strong>60,000</strong> miles p/a
            </small>
          </div>
        </div>
        <Badge
          color={"success"}
          size={"sm"}
          className="py-2 dark:bg-gray-700 dark:text-gray-200"
        >
          January 2025 Delivery
        </Badge>
        <div
          className="mt-2 border-gray-300"
          style={{ borderWidth: "1px" }}
        ></div>
        <div className="my-1">
          <h2 className="text-xl font-semibold text-blue-950 dark:text-red-500">
            Toyota Corolla
          </h2>
          <p className="text-md mt-1">72.6kWh SE Long Range Auto 5dr</p>
        </div>
        <div
          className="mt-2 border-gray-300"
          style={{ borderWidth: "1px" }}
        ></div>
        <div className="my-3 grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <IoSpeedometer fontSize={25} />
            </div>
            <p className="mt-2 text-sm">200 Miles</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <GiGasPump fontSize={25} />
            </div>
            <p className="mt-2 text-sm">Petroll</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <TbManualGearbox fontSize={25} />
            </div>
            <p className="mt-2 text-sm">Manual</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <GiCarSeat fontSize={25} />
            </div>
            <p className="mt-2 text-sm">5 Seats</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <GiCarDoor fontSize={25} />
            </div>
            <p className="mt-2 text-sm">4 Doors</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <GiPathDistance fontSize={25} />
            </div>
            <p className="mt-2 text-sm">200 Miles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeasingCarsDetail;
