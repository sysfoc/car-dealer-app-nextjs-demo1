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
  const [make, setMake] = useQueryState("make", []);

  const [millageFrom, setMillageFrom] = useQueryState("millageFrom", "");
  const [millageTo, setMillageTo] = useQueryState("millageTo", "");

  const [gearBox, setGearBox] = useQueryState("gearBox", []);
  const safeGearBox = Array.isArray(gearBox) ? gearBox : [];

  const [bodyType, setbodyType] = useQueryState("bodyType", []);
  const safebodyType = Array.isArray(bodyType) ? bodyType : [];

  const [color, setColor] = useQueryState("color", []);
  const safeColor = Array.isArray(color) ? color : [];

  const [doors, setDoors] = useQueryState("doors", []);
  const [seats, setSeats] = useQueryState("seats", []);
  const [fuel, setFuel] = useQueryState("fuel", []);

  const safeDoors = Array.isArray(doors) ? doors : [];
  const safeSeats = Array.isArray(seats) ? seats : [];
  const safeFuel = Array.isArray(fuel) ? fuel : [];
  const [battery, setBattery] = useQueryState("battery", "Any");
  const [charging, setCharging] = useQueryState("charging", "Any");

  const [engineSizeFrom, setEngineSizeFrom] = useQueryState(
    "engineSizeFrom",
    "Any",
  );
  const [engineSizeTo, setEngineSizeTo] = useQueryState("engineSizeTo", "Any");
  const [enginePowerFrom, setEnginePowerFrom] = useQueryState(
    "enginePowerFrom",
    "Any",
  );
  const [enginePowerTo, setEnginePowerTO] = useQueryState(
    "enginePowerTo",
    "Any",
  );
  const [fuelConsumption, setFuelConsumption] = useQueryState(
    "setFuelConsumption",
    "Any",
  );
  const [co2Emission, setco2Emission] = useQueryState("co2Emission", "Any");
  const [driveType, setDrivetype] = useQueryState("driveType", []);
  const safedriveType = Array.isArray(driveType) ? driveType : [];

  const driveTypeOptions = [
    { id: "four", label: "Four Wheel Drive" },
    { id: "front", label: "Front Wheel Drive" },
    { id: "rear", label: "Rear Wheel Drive" },
  ];

  const safeMake = Array.isArray(make) ? make : [];

  const handleFilterChange = (filterKey, filterValue) => {
    setFilters((prevFilters) => ({
      ...(prevFilters || {}),
      [filterKey]: filterValue,
    }));
  };
  useEffect(() => {
    console.log("safedriveType Updated:", safedriveType);
  }, [safedriveType]);

  const toggleSection = (section) => {
    const updatedSections = openSections.includes(section)
      ? openSections.filter((item) => item !== section)
      : [...openSections, section];
    setOpenSections(updatedSections);
  };
  const handleSelectChange = (stateSetter) => (event) => {
    stateSetter(event.target.value);
  };

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
        className="flex cursor-pointer flex-row items-center justify-between rounded-t-md bg-blue-950 px-5 py-3 dark:bg-gray-700"
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
        className={`${openSections.includes(content) ? "block" : "hidden"} border border-gray-300 p-3`}
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
        //
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
                <Select
                  id="from"
                  value={millageFrom}
                  onChange={handleSelectChange(setMillageFrom)}
                >
                  <option value="25000">25000 km</option>
                  <option value="26000">26000 KM</option>
                  <option value="27000">27000 KM</option>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="to" className="text-sm">
                  {t("to")}
                </Label>
                <Select
                  id="to"
                  value={millageTo}
                  onChange={handleSelectChange(setMillageTo)}
                >
                  <option value="24000">24000 KM</option>
                  <option value="26000">26000 KM</option>
                  <option value="27000">27000 KM </option>
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
                <TextInput
                  type="checkbox"
                  id="automatic"
                  name="gearbox"
                  checked={safeGearBox.includes("automatic")}
                  onChange={() => handleCheckboxChange(setGearBox, "automatic")}
                />
                <Label
                  htmlFor="automatic"
                  className="ml-3 text-sm text-gray-700"
                >
                  Automatic
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <TextInput
                  type="checkbox"
                  id="manual"
                  name="gearbox"
                  checked={safeGearBox.includes("manual")}
                  onChange={() => handleCheckboxChange(setGearBox, "manual")}
                />
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
              {[
                { id: "convertible", label: "Convertible" },
                { id: "coupe", label: "Coupe" },
                { id: "estate", label: "Estate" },
                { id: "hatchback", label: "Hatchback" },
                { id: "saloon", label: "Saloon" },
                { id: "suv", label: "SUV" },
              ].map(({ id, label }) => (
                <div key={id} className="mt-2 flex items-center">
                  <TextInput
                    type="checkbox"
                    id={id}
                    name={id}
                    checked={safebodyType.includes(id)}
                    onChange={() => handleCheckboxChange(setbodyType, id)}
                  />
                  <Label htmlFor={id} className="ml-3 text-sm text-gray-700">
                    {label}
                  </Label>
                </div>
              ))}
            </>
          ),
        },

        {
          label: t("color"),
          content: "color",
          symbol: <IoIosColorPalette fontSize={22} className="text-white" />,
          render: (
            <>
              {[
                { id: "black", label: "Black" },
                { id: "blue", label: "Blue" },
                { id: "gray", label: "Gray" },
                { id: "white", label: "White" },
                { id: "silver", label: "Silver" },
                { id: "red", label: "Red" },
                { id: "green", label: "Green" },
              ].map(({ id, label }) => (
                <div key={id} className="mt-2 flex items-center">
                  <TextInput
                    type="checkbox"
                    id={id}
                    name={id}
                    checked={safeColor.includes(id)}
                    onChange={() => handleCheckboxChange(setColor, id)}
                  />
                  <Label htmlFor={id} className="ml-3 text-sm text-gray-700">
                    {label}
                  </Label>
                </div>
              ))}
            </>
          ),
        },

        {
          label: t("doors"),
          content: "doors",
          symbol: <GiCarDoor fontSize={22} className="text-white" />,
          render: (
            <>
              {[
                { id: "2", label: "2 Doors" },
                { id: "3", label: "3 Doors" },
                { id: "4", label: "4 Doors" },
                { id: "5", label: "5 Doors" },
              ].map(({ id, label }) => (
                <div key={id} className="mt-2 flex items-center">
                  <TextInput
                    type="checkbox"
                    id={id}
                    name={id}
                    checked={safeDoors.includes(id)}
                    onChange={() => handleCheckboxChange(setDoors, id)}
                  />
                  <Label htmlFor={id} className="ml-3 text-sm text-gray-700">
                    {label}
                  </Label>
                </div>
              ))}
            </>
          ),
        },
        {
          label: t("seats"),
          content: "Seats",
          symbol: <GiCarSeat fontSize={22} className="text-white" />,
          render: (
            <>
              {[
                { id: "2", label: "2 Seats" },
                { id: "3", label: "3 Seats" },
                { id: "4", label: "4 Seats" },
                { id: "5", label: "5 Seats" },
                { id: "7", label: "7 Seats" },
              ].map(({ id, label }) => (
                <div key={id} className="mt-2 flex items-center">
                  <TextInput
                    type="checkbox"
                    id={id}
                    name={id}
                    checked={safeSeats.includes(id)}
                    onChange={() => handleCheckboxChange(setSeats, id)}
                  />
                  <Label htmlFor={id} className="ml-3 text-sm text-gray-700">
                    {label}
                  </Label>
                </div>
              ))}
            </>
          ),
        },
        {
          label: t("fuel"),
          content: "fueltype",
          symbol: <BsFillFuelPumpFill fontSize={22} className="text-white" />,
          render: (
            <>
              {[
                { id: "petrol", label: "Petrol" },
                { id: "diesel", label: "Diesel" },
                { id: "electric", label: "Electric" },
                { id: "hybrid", label: "Hybrid" },
                { id: "bi-fuel", label: "Bi Fuel" },
              ].map(({ id, label }) => (
                <div key={id} className="mt-2 flex items-center">
                  <TextInput
                    type="checkbox"
                    id={id}
                    name={id}
                    checked={safeFuel.includes(id)}
                    onChange={() => handleCheckboxChange(setFuel, id)}
                  />
                  <Label htmlFor={id} className="ml-3 text-sm text-gray-700">
                    {label}
                  </Label>
                </div>
              ))}
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
              <Select
                id="battery"
                value={battery}
                onChange={handleSelectChange(setBattery)}
              >
                <option value="Any">Any</option>
                <option value="0">0 Miles</option>
                <option value="100">100 Miles</option>
                <option value="1000">1000 Miles</option>
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
              <Select
                id="charging"
                value={charging}
                onChange={handleSelectChange(setCharging)}
              >
                <option value="Any">Any</option>
                <option value="0">0 Miles</option>
                <option value="100">100 Miles</option>
                <option value="1000">1000 Miles</option>
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
                <Select
                  id="engine-from"
                  value={engineSizeFrom}
                  onChange={handleSelectChange(setEngineSizeFrom)}
                >
                  <option value="Any">Any</option>
                  <option value="0">0L</option>
                  <option value="1">1.0L</option>
                  <option value="2">2.0L</option>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="engine-to" className="text-sm">
                  {t("to")}
                </Label>
                <Select
                  id="engine-to"
                  value={engineSizeTo}
                  onChange={handleSelectChange(setEngineSizeTo)}
                >
                  <option value="Any">Any</option>
                  <option value="0">0L</option>
                  <option value="1">1.0L</option>
                  <option value="2">2.0L</option>
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
                  {}
                </Label>
                <Select
                  id="engine-power-from"
                  value={enginePowerFrom}
                  onChange={handleSelectChange(setEnginePowerFrom)}
                >
                  <option value="Any">Any</option>
                  <option value="50">50bhp</option>
                  <option value="100">100bhp</option>
                  <option value="150">150bhp</option>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="engine-power-to" className="text-sm">
                  {t("to")}
                </Label>
                <Select
                  id="engine-power-to"
                  value={enginePowerTo}
                  onChange={handleSelectChange(setEnginePowerTO)}
                >
                  <option value="Any">Any</option>
                  <option value="50">50bhp</option>
                  <option value="100">100bhp</option>
                  <option value="150">150bhp</option>
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
              <Select
                id="fuel-comsumption"
                value={fuelConsumption}
                onChange={handleSelectChange(setFuelConsumption)}
              >
                <option value="Any">Any</option>
                <option value="30">30+mph</option>
                <option value="40">40+mph</option>
                <option value="50">50+mph</option>
                <option value="60">60+mph</option>
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
              <Select
                id="c02-emission"
                value={co2Emission}
                onChange={handleSelectChange(setco2Emission)}
              >
                <option value="Any">Any</option>
                <option value="0">Upto 0 g/km CO2</option>
                <option value="75">Upto 75 g/km CO2</option>
                <option value="100">Upto 100 g/km CO2</option>
                <option value="110">Upto 110 g/km CO2</option>
                <option value="120">Upto 120 g/km CO2</option>
              </Select>
            </div>
            //
          ),
        },

        {
          label: t("driveType"),
          content: "drive-type",
          symbol: <GiCartwheel fontSize={22} className="text-white" />,
          render: (
            <>
              {driveTypeOptions.map((option) => (
                <div key={option.id} className="mt-2 flex items-center">
                  <TextInput
                    type="checkbox"
                    id={option.id}
                    name={option.id}
                    checked={safedriveType.includes(option.id)}
                    onChange={() =>
                      handleCheckboxChange(setDrivetype, option.id)
                    }
                  />
                  <Label
                    htmlFor={option.id}
                    className="ml-3 text-sm text-gray-700"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
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
