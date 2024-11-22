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

const Features = () => {
  return (
    <div className="mt-5">
      <div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div>
            <IoSpeedometerOutline fontSize={25} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              102,999
            </span>
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              Km's
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
              Petrol
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <GiGasPump fontSize={25} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              $102
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
              102Km
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
              6 Manual
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
              5.2L
            </span>
            <span className="text-sm font-semibold text-blue-950 dark:text-gray-300">
              8 Cyllinder
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
              <TableCell>Central Locking - Remote/Keyless</TableCell>
              <TableCell>Cruise Control</TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>17" Alloy Wheels</TableCell>
              <TableCell>Power Steering - Electric Assist</TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>Air Cond. - Climate Control</TableCell>
              <TableCell>CD Player</TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>ABS (Antilock Brakes)</TableCell>
              <TableCell>Airbag - Driver</TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>Airbag - Knee Driver</TableCell>
              <TableCell>Airbag - Passenger</TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>Airbags - Head for 1st Row Seats (Front)</TableCell>
              <TableCell>Airbags - Head for 2nd Row Seats</TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>Audio - Aux Input Socket (MP3/CD/Cassette)</TableCell>
              <TableCell>Central Locking - Remote/Keyless</TableCell>
            </TableRow>
            <TableRow className="grid grid-cols-1 sm:grid-cols-2">
              <TableCell>Electric Seat - Drivers</TableCell>
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
              <TableCell>861 Stuart Highway Pinelands NT 082</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Contact
              </TableCell>
              <TableCell>(08) 8932 9299</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Licence
              </TableCell>
              <TableCell>Dealer Licence No. LMVD1030</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                ABN
              </TableCell>
              <TableCell>61639668045</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Features;
