"use client";
import { Label, Select, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { VscSymbolKeyword } from "react-icons/vsc";
import { SiCmake } from "react-icons/si";
import { TbEngine } from "react-icons/tb";
import { IoMdArrowDropdown, IoIosColorPalette } from "react-icons/io";
import { IoPricetag } from "react-icons/io5";
import {
  FaLocationDot,
  FaRecycle,
  FaRegCalendarCheck,
  FaCar,
  FaHourglassEnd,
} from "react-icons/fa6";
import { IoIosSpeedometer } from "react-icons/io";
import { RxBoxModel } from "react-icons/rx";
import {
  GiCarDoor,
  GiCartwheel,
  GiGearStickPattern,
  GiPathDistance,
  GiCarSeat,
} from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdBatteryCharging50, MdOutlineCo2 } from "react-icons/md";
import { ImPower } from "react-icons/im";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

const SidebarFilters = ({ onFiltersChange }) => {
  const t = useTranslations("Filters");
  const [openSections, setOpenSections] = useState("openSections", []);
  const [filters, setFilters] = useState({});

  const [keyword, setKeyword] = useQueryState("keyword", "");
  const [condition, setCondition] = useQueryState("condition", []);
  const [location, setLocation] = useQueryState("location", []);
  const [price, setPrice] = useQueryState("price", []);
  const safeCondition = Array.isArray(condition) ? condition : [];
  const safeLocation = Array.isArray(location) ? location : [];
  const safePrice = Array.isArray(price) ? price : [];
  const [minYear, setMinYear] = useQueryState("minYear", "");
  const [maxYear, setMaxYear] = useQueryState("maxYear", "");
  const [make, setMake] = useQueryState("setMake", []);
  const safeMake = Array.isArray(make) ? make : [];

  const handleFilterChange = (filterKey, filterValue) => {
    setFilters((prevFilters) => ({
      ...(prevFilters || {}),
      [filterKey]: filterValue,
    }));
  };
  useEffect(() => {
    console.log("safeMake Updated:", safeMake);
  }, [safeMake]);

  const toggleSection = (section) => {
    const updatedSections = openSections.includes(section)
      ? openSections.filter((item) => item !== section)
      : [...openSections, section];
    setOpenSections(updatedSections);
  };
  // const handleCheckboxChange = (stateSetter, value) => {
  //   stateSetter((prev) =>
  //     Array.isArray(prev)
  //       ? prev.includes(value)
  //         ? prev.filter((item) => item !== value)
  //         : [...prev, value]
  //       : [value],
  //   );
  // };
  const handleCheckboxChange = (stateSetter, value) => {
    stateSetter((prev) => {
      const prevArray = Array.isArray(prev) ? prev : [];
      console.log("Previous State:", prevArray);
      console.log("Value to Update:", value);

      if (prevArray.includes(value)) {
        console.log(`Removing: ${value}`);
        return prevArray.filter((item) => item !== value);
      }

      console.log(`Adding: ${value}`);
      return [...prevArray, value];
    });
  };

  const FilterSection = ({ label, content, symbol, children }) => (
    <div>
      <div
        className="filter-header flex cursor-pointer flex-row items-center justify-between rounded-t-md bg-blue-950 px-5 py-3 dark:bg-gray-700"
        onClick={() => toggleSection(content)}
      >
        <div className="flex items-center gap-x-3">
          {symbol}
          <h3 className="font-bold uppercase text-white">{label}</h3>
        </div>
        <IoMdArrowDropdown
          fontSize={25}
          color="white"
          className={`transition-transform ${openSections.includes(content) ? "rotate-180" : ""}`}
        />
      </div>
      <div
        className={`filter-content ${openSections.includes(content) ? "block" : "hidden"} border border-gray-300 p-3`}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-3">
      {[
        {
          label: t("keyword"),
          content: "keyword",
          symbol: <VscSymbolKeyword fontSize={22} className="text-white" />,
          render: (
            <div className="flex flex-col gap-2">
              <label htmlFor="keyword">Keyword</label>
              <input
                type="text"
                id="keyword"
                value={keyword}
                onChange={(e) => {
                  const value = e.target.value;
                  setKeyword(value);
                  handleFilterChange("keyword", value);
                }}
                placeholder="e.g., Toyota"
                className="border p-2"
              />
            </div>
          ),
        },
        {
          label: t("condition"),
          content: "condition",
          symbol: <FaRecycle fontSize={22} className="text-white" />,
          render: (
            <>
              <div className="mt-2 flex items-center">
                <TextInput
                  type="checkbox"
                  id="new"
                  checked={safeCondition.includes("new")}
                  onChange={() => handleCheckboxChange(setCondition, "new")}
                />
                <Label htmlFor="new" className="ml-3 text-sm text-gray-700">
                  New
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <TextInput
                  type="checkbox"
                  id="used"
                  checked={safeCondition.includes("used")}
                  onChange={() => handleCheckboxChange(setCondition, "used")}
                />
                <Label htmlFor="used" className="ml-3 text-sm text-gray-700">
                  Used
                </Label>
              </div>
            </>
          ),
        },

        {
          label: t("location"),
          content: "location",
          symbol: <FaLocationDot fontSize={22} className="text-white" />,
          render: (
            <>
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="Cityville"
                  checked={safeLocation.includes("Cityville")}
                  onChange={() => {
                    handleCheckboxChange(setLocation, "Cityville");
                    console.log("Updated safeLocation:", safeLocation);
                  }}
                />
                <label
                  htmlFor="Cityville"
                  className="ml-3 text-sm text-gray-700"
                >
                  Cityville
                </label>
              </div>
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="uk"
                  checked={safeLocation.includes("uk")}
                  onChange={() => {
                    handleCheckboxChange(setLocation, "uk");
                    console.log("Updated safeLocation:", safeLocation);
                  }}
                />
                <label htmlFor="uk" className="ml-3 text-sm text-gray-700">
                  United Kingdom
                </label>
              </div>
            </>
          ),
        },

        {
          label: t("price"),
          content: "price",
          symbol: <IoPricetag fontSize={22} className="text-white" />,
          render: (
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
              <button
                onClick={() => {
                  handleFilterChange("price", "18000");
                  setPrice("18000");
                }}
                className={`rounded border ${price === "18000" ? "bg-blue-950 text-white" : "text-blue-950"} px-3 py-2 text-sm transition-all hover:scale-95 hover:bg-blue-950`}
              >
                $18k
              </button>

              <button
                onClick={() => {
                  handleFilterChange("price", "20000");
                  setPrice("20000");
                }}
                className={`rounded border ${price === "20000" ? "bg-blue-950 text-white" : "text-blue-950"} px-3 py-2 text-sm transition-all hover:scale-95 hover:bg-blue-950`}
              >
                $20k
              </button>
            </div>
          ),
        },

        {
          label: t("year"),
          content: "year",
          symbol: <FaRegCalendarCheck fontSize={22} className="text-white" />,
          render: (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col">
                <Label htmlFor="minYear" className="text-sm">
                  Min year
                </Label>
                <TextInput
                  type="number"
                  name="minYear"
                  id="minYear"
                  value={minYear}
                  onChange={(e) => {
                    const value = e.target.value;
                    setMinYear(value);
                    handleFilterChange("minYear", value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="maxYear" className="text-sm">
                  MaxYear
                </Label>
                <TextInput
                  type="number"
                  name="maxYear"
                  id="maxYear"
                  value={maxYear}
                  onChange={(e) => {
                    const value = e.target.value;
                    setMaxYear(value);
                    handleFilterChange("maxYear", value);
                  }}
                />
              </div>
            </div>
          ),
        },

        //
        {
          label: t("make"),
          content: "make",
          symbol: <SiCmake fontSize={22} className="text-white" />,
          render: (
            <>
              {["Toyota1", "Toyota2"].map((value) => (
                <div className="mt-2 flex items-center" key={value}>
                  <TextInput
                    type="checkbox"
                    id={value}
                    checked={safeMake.includes(value)}
                    onChange={() => handleCheckboxChange(setMake, value)}
                  />
                  <Label htmlFor={value} className="ml-3 text-sm text-gray-700">
                    {value}
                  </Label>
                </div>
              ))}
            </>
          ),
        },

        {
          label: t("mileage"),
          content: "mileage",
          symbol: <IoIosSpeedometer fontSize={22} className="text-white" />,
          render: (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col">
                <Label htmlFor="from" className="text-sm">
                  {t("from")}
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
                  {t("to")}
                </Label>
                <Select id="to">
                  <option value="Any">Any</option>
                  <option value="0 miles">0 Miles</option>
                  <option value="100 miles">100 Miles</option>
                  <option value="1000 miles">1000 Miles</option>
                </Select>
              </div>
            </div>
          ),
        },
        {
          label: t("gearbox"),
          content: "gearbox",
          symbol: <GiGearStickPattern fontSize={22} className="text-white" />,
          render: (
            <>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="automatic" name="gearbox" />
                <Label
                  htmlFor="automatic"
                  className="ml-3 text-sm text-gray-700"
                >
                  Automatic
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="manual" name="gearbox" />
                <Label htmlFor="manual" className="ml-3 text-sm text-gray-700">
                  Manual
                </Label>
              </div>
            </>
          ),
        },

        {
          label: t("body"),
          content: "bodytype",
          symbol: <FaCar fontSize={22} className="text-white" />,
          render: (
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
                <Label htmlFor="estate" className="ml-3 text-sm text-gray-700">
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
                <Label htmlFor="saloon" className="ml-3 text-sm text-gray-700">
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
          ),
        },

        {
          label: t("color"),
          content: "color",
          symbol: <IoIosColorPalette fontSize={22} className="text-white" />,
          render: (
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
                <Label htmlFor="silver" className="ml-3 text-sm text-gray-700">
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
          ),
        },

        {
          label: t("doors"),
          content: "doors",
          symbol: <GiCarDoor fontSize={22} className="text-white" />,
          render: (
            <>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="doors-2" name="doors-2" />
                <Label htmlFor="doors-2" className="ml-3 text-sm text-gray-700">
                  2 Doors
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="doors-3" name="doors-3" />
                <Label htmlFor="doors-3" className="ml-3 text-sm text-gray-700">
                  3 Doors
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="doors-4" name="doors-4" />
                <Label htmlFor="doors-4" className="ml-3 text-sm text-gray-700">
                  4 Doors
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="doors-5" name="doors-5" />
                <Label htmlFor="doors-5" className="ml-3 text-sm text-gray-700">
                  5 Doors
                </Label>
              </div>
            </>
          ),
        },
        {
          label: t("seats"),
          content: "Seats",
          symbol: <GiCarSeat fontSize={22} className="text-white" />,
          render: (
            <>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="seats-2" name="seats-2" />
                <Label htmlFor="doors-2" className="ml-3 text-sm text-gray-700">
                  2 Seats
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="seats-3" name="seats-3" />
                <Label htmlFor="seats-3" className="ml-3 text-sm text-gray-700">
                  3 Seats
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="seats-4" name="seats-4" />
                <Label htmlFor="seats-4" className="ml-3 text-sm text-gray-700">
                  4 Seats
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="seats-5" name="seats-5" />
                <Label htmlFor="seats-5" className="ml-3 text-sm text-gray-700">
                  5 Seats
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="seats-7" name="seats-7" />
                <Label htmlFor="seats-7" className="ml-3 text-sm text-gray-700">
                  7 Seats
                </Label>
              </div>
            </>
          ),
        },

        {
          label: t("fuel"),
          content: "fueltype",
          symbol: <BsFillFuelPumpFill fontSize={22} className="text-white" />,
          render: (
            <>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="petrol" name="petrol" />
                <Label htmlFor="petrol" className="ml-3 text-sm text-gray-700">
                  Petrol
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="diesel" name="diesel" />
                <Label htmlFor="diesel" className="ml-3 text-sm text-gray-700">
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
                <Label htmlFor="hybrid" className="ml-3 text-sm text-gray-700">
                  Hybrid
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="bi-fuel" name="bi-fuel" />
                <Label htmlFor="bi-fuel" className="ml-3 text-sm text-gray-700">
                  Bi Fuel
                </Label>
              </div>
            </>
          ),
        },

        {
          label: t("battery"),
          content: "battery",
          symbol: <GiPathDistance fontSize={22} className="text-white" />,
          render: (
            <div className="flex flex-col">
              <Label htmlFor="battery" className="text-sm">
                {t("battery")}
              </Label>
              <Select id="battery">
                <option value="Any">Any</option>
                <option value="0 miles">0 Miles</option>
                <option value="100 miles">100 Miles</option>
                <option value="1000 miles">1000 Miles</option>
              </Select>
            </div>
          ),
        },

        {
          label: t("charging"),
          content: "charging",
          symbol: <MdBatteryCharging50 fontSize={22} className="text-white" />,
          render: (
            <div className="flex flex-col">
              <Label htmlFor="charging" className="text-sm">
                {t("charging")}
              </Label>
              <Select id="charging">
                <option value="Any">Any</option>
                <option value="0 miles">0 Miles</option>
                <option value="100 miles">100 Miles</option>
                <option value="1000 miles">1000 Miles</option>
              </Select>
            </div>
          ),
        },

        {
          label: t("engineSize"),
          content: "engine-size",
          symbol: <TbEngine fontSize={22} className="text-white" />,
          render: (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col">
                <Label htmlFor="engine-from" className="text-sm">
                  {t("from")}
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
                  {t("to")}
                </Label>
                <Select id="engine-to">
                  <option value="Any">Any</option>
                  <option value="0-l">0L</option>
                  <option value="1.0l">1.0L</option>
                  <option value="2.0l">2.0L</option>
                </Select>
              </div>
            </div>
          ),
        },
        {
          label: t("enginePower"),
          content: "engine-power",
          symbol: <ImPower fontSize={22} className="text-white" />,
          render: (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col">
                <Label htmlFor="engine-power-from" className="text-sm">
                  {t("from")}
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
                  {t("to")}
                </Label>
                <Select id="engine-power-to">
                  <option value="Any">Any</option>
                  <option value="50bhp">50bhp</option>
                  <option value="100bhp">100bhp</option>
                  <option value="150bhp">150bhp</option>
                </Select>
              </div>
            </div>
          ),
        },

        {
          label: t("fuelConsumption"),
          content: "fuel-comsumption",
          symbol: <FaHourglassEnd fontSize={22} className="text-white" />,
          render: (
            <div className="flex flex-col">
              <Label htmlFor="fuel-comsumption" className="text-sm">
                {t("fuelConsumption")}
              </Label>
              <Select id="fuel-comsumption">
                <option value="Any">Any</option>
                <option value="30mph">30+mph</option>
                <option value="40mph">40+mph</option>
                <option value="50mph">50+mph</option>
                <option value="60mph">60+mph</option>
              </Select>
            </div>
          ),
        },

        {
          label: t("co2"),
          content: "c02-emission",
          symbol: <MdOutlineCo2 fontSize={22} className="text-white" />,
          render: (
            <div className="flex flex-col">
              <Label htmlFor="c02-emission" className="text-sm">
                {t("co2")}
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
          ),
        },
        {
          label: t("driveType"),
          content: "drive-type",
          symbol: <GiCartwheel fontSize={22} className="text-white" />,
          render: (
            <>
              <div className="mt-2 flex items-center">
                <TextInput type="checkbox" id="four-wheel" name="four-wheel" />
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
                <TextInput type="checkbox" id="rear-wheel" name="rear-wheel" />
                <Label
                  htmlFor="rear-wheel"
                  className="ml-3 text-sm text-gray-700"
                >
                  Rear Wheel Drive
                </Label>
              </div>
            </>
          ),
        },
      ].map((section, index) => (
        <FilterSection
          key={index}
          label={section.label}
          content={section.content}
          symbol={section.symbol}
        >
          {section.render}
        </FilterSection>
      ))}
    </div>
  );
};

export default SidebarFilters;
