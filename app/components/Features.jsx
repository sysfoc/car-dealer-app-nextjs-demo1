import React from "react";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGasPump } from "react-icons/gi";
import { PiGasCanLight } from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { TbManualGearbox } from "react-icons/tb";
import { GiMagicLamp } from "react-icons/gi";
import { Table, TableBody, TableCell, TableRow } from "flowbite-react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Features = ({ loadingState, carData }) => {
  const loading = loadingState;
  return (
    <div className="mt-5">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div>
            <IoSpeedometerOutline fontSize={25} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              {loading ? <Skeleton /> : carData.kms}
            </span>
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              Kms
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <PiGasCanLight fontSize={25} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              On
            </span>
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              {loading ? <Skeleton /> : carData.fuel_type}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <GiGasPump fontSize={25} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              {loading ? <Skeleton /> : carData.fuel_tank_fill_price}
            </span>
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              To Fill
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <GrMapLocation fontSize={25} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              {loading ? <Skeleton /> : carData.fuel_capacity_per_tank}
            </span>
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              Average Per Tank
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <TbManualGearbox fontSize={25} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              {loading ? <Skeleton /> : "6 Manual"}
            </span>
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              Gears
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <GiMagicLamp fontSize={25} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              {loading ? <Skeleton className="h-[15px] w-[50px]" /> : "5.0L"}
            </span>
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              9 Cylinder
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 border-b-2 border-blue-950 dark:border-gray-700"></div>
      <div className="my-3">
        <div className="flex items-center gap-2 bg-blue-950 p-3 dark:bg-gray-700">
          <div>
            <BsFillBookmarkFill fontSize={20} className="text-white" />
          </div>
          <h3 className="text-lg font-bold uppercase text-white">
            Vehical Features
          </h3>
        </div>
        <Table hoverable className="mt-3 dark:bg-gray-700">
          <TableBody className="divide-y">
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>
                {loading ? (
                  <Skeleton height={25} />
                ) : (
                  "Central Locking - Remote/Keyless"
                )}
              </TableCell>
              <TableCell>
                {loading ? <Skeleton height={25} /> : "Cruise Control"}
              </TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>
                {loading ? (
                  <Skeleton height={25} />
                ) : (
                  "Central Locking - Remote/Keyless"
                )}
              </TableCell>
              <TableCell>
                {loading ? <Skeleton height={25} /> : "Cruise Control"}
              </TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>
                {loading ? (
                  <Skeleton height={25} />
                ) : (
                  "Central Locking - Remote/Keyless"
                )}
              </TableCell>
              <TableCell>
                {loading ? <Skeleton height={25} /> : "Cruise Control"}
              </TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>
                {loading ? (
                  <Skeleton height={25} />
                ) : (
                  "Central Locking - Remote/Keyless"
                )}
              </TableCell>
              <TableCell>
                {loading ? <Skeleton height={25} /> : "Cruise Control"}
              </TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>
                {loading ? (
                  <Skeleton height={25} />
                ) : (
                  "Central Locking - Remote/Keyless"
                )}
              </TableCell>
              <TableCell>
                {loading ? <Skeleton height={25} /> : "Cruise Control"}
              </TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>
                {loading ? (
                  <Skeleton height={25} />
                ) : (
                  "Central Locking - Remote/Keyless"
                )}
              </TableCell>
              <TableCell>
                {loading ? <Skeleton height={25} /> : "Cruise Control"}
              </TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>
                {loading ? (
                  <Skeleton height={25} />
                ) : (
                  "Central Locking - Remote/Keyless"
                )}
              </TableCell>
              <TableCell>
                {loading ? <Skeleton height={25} /> : "Cruise Control"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="mt-8 flex items-center gap-2 bg-blue-950 p-3 dark:bg-gray-700">
        <div>
          <MdLocationOn fontSize={25} className="text-white" />
        </div>
        <h3 className="text-lg font-bold uppercase text-white">
          Where To Find Us
        </h3>
      </div>
      <div>
        <Table hoverable className="mt-3 dark:bg-gray-700">
          <TableBody className="divide-y">
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Location
              </TableCell>
              <TableCell>
                {loading ? (
                  <Skeleton height={25} />
                ) : (
                  "861 Stuart Highway Pinelands NT 082"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Contact
              </TableCell>
              <TableCell>
                {loading ? <Skeleton height={25} /> : "(08) 8932 9299"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Licence
              </TableCell>
              <TableCell>
                {loading ? (
                  <Skeleton height={25} />
                ) : (
                  "Dealer Licence No. LMVD1030"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                ABN
              </TableCell>
              <TableCell>
                {loading ? <Skeleton height={25} /> : "61639668045"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Features;
