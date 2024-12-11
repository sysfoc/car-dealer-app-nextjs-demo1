"use client";
import { Label, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { VscSymbolKeyword } from "react-icons/vsc";
import { SiCmake } from "react-icons/si";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoPricetag } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoIosSpeedometer } from "react-icons/io";
import { RxBoxModel } from "react-icons/rx";
import { GiGearStickPattern } from "react-icons/gi";
import { FaCar } from "react-icons/fa6";
import { IoIosColorPalette } from "react-icons/io";
import { GiCarDoor } from "react-icons/gi";
import { GiPathDistance } from "react-icons/gi";
import { GiCarSeat } from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdBatteryCharging50 } from "react-icons/md";
import { TbEngine } from "react-icons/tb";
import { ImPower } from "react-icons/im";
import { FaHourglassEnd } from "react-icons/fa";
import { MdOutlineCo2 } from "react-icons/md";
import { GiCartwheel } from "react-icons/gi";
import { FaRecycle } from "react-icons/fa6";
const SidebarFilters = () => {
  const [openSections, setOpenSections] = useState([]);

  const toggleSection = (section) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section],
    );
  };

  return (
    <div className="flex flex-col gap-y-3">
      {[
        {
          label: "Search By Keyword",
          content: "keyword",
          symbol: <VscSymbolKeyword fontSize={22} className="text-white" />,
        },
        {
          label: "Condition",
          content: "condition",
          symbol: <FaRecycle fontSize={22} className="text-white" />,
        },
        {
          label: "Location",
          content: "location",
          symbol: <FaLocationDot fontSize={22} className="text-white" />,
        },
        {
          label: "Price",
          content: "price",
          symbol: <IoPricetag fontSize={22} className="text-white" />,
        },
        {
          label: "Year",
          content: "year",
          symbol: <FaRegCalendarCheck fontSize={22} className="text-white" />,
        },
        {
          label: "Make",
          content: "make",
          symbol: <SiCmake fontSize={22} className="text-white" />,
        },
        {
          label: "Model",
          content: "model",
          symbol: <RxBoxModel fontSize={22} className="text-white" />,
        },
        {
          label: "Mileage",
          content: "mileage",
          symbol: <IoIosSpeedometer fontSize={22} className="text-white" />,
        },
        {
          label: "Gear box",
          content: "gearbox",
          symbol: <GiGearStickPattern fontSize={22} className="text-white" />,
        },
        {
          label: "Body type",
          content: "bodytype",
          symbol: <FaCar fontSize={22} className="text-white" />,
        },
        {
          label: "Color",
          content: "color",
          symbol: <IoIosColorPalette fontSize={22} className="text-white" />,
        },
        {
          label: "Door",
          content: "door",
          symbol: <GiCarDoor fontSize={22} className="text-white" />,
        },
        {
          label: "Seats",
          content: "seats",
          symbol: <GiCarSeat fontSize={22} className="text-white" />,
        },
        {
          label: "Fuel type",
          content: "fueltype",
          symbol: <BsFillFuelPumpFill fontSize={22} className="text-white" />,
        },
        {
          label: "Battery Range",
          content: "battery",
          symbol: <GiPathDistance fontSize={22} className="text-white" />,
        },
        {
          label: "Charging Time",
          content: "charging",
          symbol: <MdBatteryCharging50 fontSize={22} className="text-white" />,
        },
        {
          label: "Engine Size",
          content: "engine-size",
          symbol: <TbEngine fontSize={22} className="text-white" />,
        },
        {
          label: "Engine Power",
          content: "engine-power",
          symbol: <ImPower fontSize={22} className="text-white" />,
        },
        {
          label: "Fuel Consumption",
          content: "fuel-comsumption",
          symbol: <FaHourglassEnd fontSize={22} className="text-white" />,
        },
        {
          label: "Co2 Emission",
          content: "c02-emission",
          symbol: <MdOutlineCo2 fontSize={22} className="text-white" />,
        },
        {
          label: "Drive Type",
          content: "drive-type",
          symbol: <GiCartwheel fontSize={22} className="text-white" />,
        },
      ].map((section, index) => (
        <div key={index}>
          <div
            className="filter-header flex cursor-pointer flex-row items-center justify-between rounded-t-md bg-blue-950 px-5 py-3 dark:bg-gray-700"
            onClick={() => toggleSection(section.content)}
          >
            <div className="flex items-center gap-x-3">
              {section.symbol}
              <h3 className="font-bold uppercase text-white">
                {section.label}
              </h3>
            </div>
            <IoMdArrowDropdown
              fontSize={25}
              color="white"
              className={`transition-transform ${
                openSections.includes(section.content) ? "rotate-180" : ""
              }`}
            />
          </div>
          <div
            className={`filter-content ${
              openSections.includes(section.content) ? "block" : "hidden"
            } border border-gray-300 px-3 py-3`}
          >
            {section.content === "keyword" && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="keyword">Type Specific Keyword</Label>
                <TextInput
                  type="text"
                  id="keyword"
                  placeholder="e.g., Toyota"
                />
              </div>
            )}
            {section.content === "condition" && (
              <>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="new" name="new" />
                  <Label htmlFor="new" className="ml-3 text-sm text-gray-700">
                    New
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="used" name="used" />
                  <Label htmlFor="used" className="ml-3 text-sm text-gray-700">
                    Used
                  </Label>
                </div>
              </>
            )}
            {section.content === "location" && (
              <>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="usa" name="country" />
                  <Label htmlFor="usa" className="ml-3 text-sm text-gray-700">
                    United States
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="uk" name="country" />
                  <Label htmlFor="uk" className="ml-3 text-sm text-gray-700">
                    United Kingdom
                  </Label>
                </div>
              </>
            )}
            {section.content === "price" && (
              <>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
                  <button className="rounded border border-blue-950 px-3 py-2 text-sm text-blue-950 transition-all hover:scale-95 hover:bg-blue-950 hover:text-white dark:bg-gray-700 dark:text-white">
                    $10000
                  </button>
                  <button className="rounded border border-blue-950 px-3 py-2 text-sm text-blue-950 transition-all hover:scale-95 hover:bg-blue-950 hover:text-white dark:bg-gray-700 dark:text-white">
                    $30000
                  </button>
                  <button className="rounded border border-blue-950 px-3 py-2 text-sm text-blue-950 transition-all hover:scale-95 hover:bg-blue-950 hover:text-white dark:bg-gray-700 dark:text-white">
                    $40000
                  </button>
                  <button className="rounded border border-blue-950 px-3 py-2 text-sm text-blue-950 transition-all hover:scale-95 hover:bg-blue-950 hover:text-white dark:bg-gray-700 dark:text-white">
                    $50000
                  </button>
                  <button className="rounded border border-blue-950 px-3 py-2 text-sm text-blue-950 transition-all hover:scale-95 hover:bg-blue-950 hover:text-white dark:bg-gray-700 dark:text-white">
                    $100000
                  </button>
                </div>
              </>
            )}
            {section.content === "year" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col">
                  <Label htmlFor="min" className="text-sm">
                    Min
                  </Label>
                  <TextInput type="number" name="min" id="min" />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="max" className="text-sm">
                    Max
                  </Label>
                  <TextInput type="number" name="max" id="max" />
                </div>
              </div>
            )}
            {section.content === "make" && (
              <>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="toyota" name="make" />
                  <Label
                    htmlFor="toyota"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Toyota
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="honda" name="make" />
                  <Label htmlFor="honda" className="ml-3 text-sm text-gray-700">
                    Honda
                  </Label>
                </div>
              </>
            )}
            {section.content === "model" && (
              <>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="corolla" name="model" />
                  <Label
                    htmlFor="corolla"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Corolla
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="civic" name="model" />
                  <Label htmlFor="civic" className="ml-3 text-sm text-gray-700">
                    Civic
                  </Label>
                </div>
              </>
            )}
            {section.content === "mileage" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col">
                  <Label htmlFor="from" className="text-sm">
                    From
                  </Label>
                  <Select id="from">
                    <option value="Any">Any</option>
                    <option value="0 miles">0 Miles</option>
                    <option value="100 miles">100 Miles</option>
                    <option value="1000 miles">1000 Miles</option>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="to" className="text-sm">
                    To
                  </Label>
                  <Select id="to">
                    <option value="Any">Any</option>
                    <option value="0 miles">0 Miles</option>
                    <option value="100 miles">100 Miles</option>
                    <option value="1000 miles">1000 Miles</option>
                  </Select>
                </div>
              </div>
            )}
            {section.content === "gearbox" && (
              <>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="automatic" name="automatic" />
                  <Label
                    htmlFor="automatic"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Automatic
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="manual" name="manual" />
                  <Label
                    htmlFor="manual"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Manual
                  </Label>
                </div>
              </>
            )}
            {section.content === "bodytype" && (
              <>
                <div className="mt-2 flex items-center">
                  <TextInput
                    type="checkbox"
                    id="convertible"
                    name="convertible"
                  />
                  <Label
                    htmlFor="convertible"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Convertible
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="coupe" name="coupe" />
                  <Label htmlFor="coupe" className="ml-3 text-sm text-gray-700">
                    Coupe
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="estate" name="estate" />
                  <Label
                    htmlFor="estate"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Estate
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="hatchback" name="hatchback" />
                  <Label
                    htmlFor="hatchback"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Hatchback
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="saloon" name="saloon" />
                  <Label
                    htmlFor="saloon"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Saloon
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="suv" name="suv" />
                  <Label htmlFor="suv" className="ml-3 text-sm text-gray-700">
                    SUV
                  </Label>
                </div>
              </>
            )}
            {section.content === "color" && (
              <>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="black" name="black" />
                  <Label htmlFor="black" className="ml-3 text-sm text-gray-700">
                    Black
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="blue" name="blue" />
                  <Label htmlFor="blue" className="ml-3 text-sm text-gray-700">
                    Blue
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="gray" name="gray" />
                  <Label htmlFor="gray" className="ml-3 text-sm text-gray-700">
                    Gray
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="white" name="white" />
                  <Label htmlFor="white" className="ml-3 text-sm text-gray-700">
                    White
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="silver" name="silver" />
                  <Label
                    htmlFor="silver"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Silver
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="red" name="red" />
                  <Label htmlFor="red" className="ml-3 text-sm text-gray-700">
                    Red
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="green" name="green" />
                  <Label htmlFor="green" className="ml-3 text-sm text-gray-700">
                    Green
                  </Label>
                </div>
              </>
            )}
            {section.content === "door" && (
              <>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="doors-2" name="doors-2" />
                  <Label
                    htmlFor="doors-2"
                    className="ml-3 text-sm text-gray-700"
                  >
                    2 Doors
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="doors-3" name="doors-3" />
                  <Label
                    htmlFor="doors-3"
                    className="ml-3 text-sm text-gray-700"
                  >
                    3 Doors
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="doors-4" name="doors-4" />
                  <Label
                    htmlFor="doors-4"
                    className="ml-3 text-sm text-gray-700"
                  >
                    4 Doors
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="doors-5" name="doors-5" />
                  <Label
                    htmlFor="doors-5"
                    className="ml-3 text-sm text-gray-700"
                  >
                    5 Doors
                  </Label>
                </div>
              </>
            )}
            {section.content === "seats" && (
              <>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="seats-2" name="seats-2" />
                  <Label
                    htmlFor="doors-2"
                    className="ml-3 text-sm text-gray-700"
                  >
                    2 Seats
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="seats-3" name="seats-3" />
                  <Label
                    htmlFor="seats-3"
                    className="ml-3 text-sm text-gray-700"
                  >
                    3 Seats
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="seats-4" name="seats-4" />
                  <Label
                    htmlFor="seats-4"
                    className="ml-3 text-sm text-gray-700"
                  >
                    4 Seats
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="seats-5" name="seats-5" />
                  <Label
                    htmlFor="seats-5"
                    className="ml-3 text-sm text-gray-700"
                  >
                    5 Seats
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="seats-7" name="seats-7" />
                  <Label
                    htmlFor="seats-7"
                    className="ml-3 text-sm text-gray-700"
                  >
                    7 Seats
                  </Label>
                </div>
              </>
            )}
            {section.content === "fueltype" && (
              <>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="petrol" name="petrol" />
                  <Label
                    htmlFor="petrol"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Petrol
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="diesel" name="diesel" />
                  <Label
                    htmlFor="diesel"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Diesel
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="electric" name="electric" />
                  <Label
                    htmlFor="electric"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Electric
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="hybrid" name="hybrid" />
                  <Label
                    htmlFor="hybrid"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Hybrid
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput type="checkbox" id="bi-fuel" name="bi-fuel" />
                  <Label
                    htmlFor="bi-fuel"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Bi Fuel
                  </Label>
                </div>
              </>
            )}
            {section.content === "battery" && (
              <div className="flex flex-col">
                <Label htmlFor="battery" className="text-sm">
                  Battery Time
                </Label>
                <Select id="battery">
                  <option value="Any">Any</option>
                  <option value="0 miles">0 Miles</option>
                  <option value="100 miles">100 Miles</option>
                  <option value="1000 miles">1000 Miles</option>
                </Select>
              </div>
            )}
            {section.content === "charging" && (
              <div className="flex flex-col">
                <Label htmlFor="charging" className="text-sm">
                  Charging Time
                </Label>
                <Select id="charging">
                  <option value="Any">Any</option>
                  <option value="0 miles">0 Miles</option>
                  <option value="100 miles">100 Miles</option>
                  <option value="1000 miles">1000 Miles</option>
                </Select>
              </div>
            )}
            {section.content === "engine-size" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col">
                  <Label htmlFor="engine-from" className="text-sm">
                    From
                  </Label>
                  <Select id="engine-from">
                    <option value="Any">Any</option>
                    <option value="0-l">0L</option>
                    <option value="1.0l">1.0L</option>
                    <option value="2.0l">2.0L</option>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="engine-to" className="text-sm">
                    To
                  </Label>
                  <Select id="engine-to">
                    <option value="Any">Any</option>
                    <option value="0-l">0L</option>
                    <option value="1.0l">1.0L</option>
                    <option value="2.0l">2.0L</option>
                  </Select>
                </div>
              </div>
            )}
            {section.content === "engine-power" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col">
                  <Label htmlFor="engine-power-from" className="text-sm">
                    From
                  </Label>
                  <Select id="engine-power-from">
                    <option value="Any">Any</option>
                    <option value="50bhp">50bhp</option>
                    <option value="100bhp">100bhp</option>
                    <option value="150bhp">150bhp</option>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="engine-power-to" className="text-sm">
                    To
                  </Label>
                  <Select id="engine-power-to">
                    <option value="Any">Any</option>
                    <option value="50bhp">50bhp</option>
                    <option value="100bhp">100bhp</option>
                    <option value="150bhp">150bhp</option>
                  </Select>
                </div>
              </div>
            )}
            {section.content === "fuel-comsumption" && (
              <div className="flex flex-col">
                <Label htmlFor="fuel-comsumption" className="text-sm">
                  Fuel Consumption
                </Label>
                <Select id="fuel-comsumption">
                  <option value="Any">Any</option>
                  <option value="30mph">30+mph</option>
                  <option value="40mph">40+mph</option>
                  <option value="50mph">50+mph</option>
                  <option value="60mph">60+mph</option>
                </Select>
              </div>
            )}
            {section.content === "c02-emission" && (
              <div className="flex flex-col">
                <Label htmlFor="c02-emission" className="text-sm">
                  CO2 Emission
                </Label>
                <Select id="c02-emission">
                  <option value="Any">Any</option>
                  <option value="0g/km">Upto 0 g/km CO2</option>
                  <option value="75g/km">Upto 75 g/km CO2</option>
                  <option value="100g/km">Upto 100 g/km CO2</option>
                  <option value="110g/km">Upto 110 g/km CO2</option>
                  <option value="120g/km">Upto 120 g/km CO2</option>
                </Select>
              </div>
            )}
            {section.content === "drive-type" && (
              <>
                <div className="mt-2 flex items-center">
                  <TextInput
                    type="checkbox"
                    id="four-wheel"
                    name="four-wheel"
                  />
                  <Label
                    htmlFor="four-wheel"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Four Wheel Drive
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput
                    type="checkbox"
                    id="front-wheel"
                    name="front-wheel"
                  />
                  <Label
                    htmlFor="front-wheel"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Front Wheel Drive
                  </Label>
                </div>
                <div className="mt-2 flex items-center">
                  <TextInput
                    type="checkbox"
                    id="rear-wheel"
                    name="rear-wheel"
                  />
                  <Label
                    htmlFor="rear-wheel"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Rear Wheel Drive
                  </Label>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarFilters;
