
"use client";
import { Checkbox, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { VscSymbolKeyword } from "react-icons/vsc";
import { SiCmake, SiGoogleearthengine } from "react-icons/si";
import { TbEngine } from "react-icons/tb";
import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  IoMdArrowDropdown,
  IoIosColorPalette,
  IoIosSpeedometer,
} from "react-icons/io";
import { IoPricetag } from "react-icons/io5";
import {
  FaLocationDot,
  FaRecycle,
  FaRegCalendarCheck,
  FaCar,
  FaHourglassEnd,
} from "react-icons/fa6";
import {
  GiCarDoor,
  GiCartwheel,
  GiGearStickPattern,
  GiPathDistance,
  GiCarSeat,
  GiGasPump,
  GiBatteryPack,
  GiElectric,
  GiPowerLightning,
  GiCarWheel,
} from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdBatteryCharging50, MdOutlineCo2 } from "react-icons/md";
import { ImPower } from "react-icons/im";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

const SidebarFilters = ({ onFiltersChange }) => {
  const t = useTranslations("Filters");
  const router = useRouter();
const [localFilters, setLocalFilters] = useState({});
  const [openSections, setOpenSections] = useState("openSections", []);
  const [filters, setFilters] = useState({});

  const [keyword, setKeyword] = useQueryState("keyword", "");

  const handleSearchDebounced = useDebouncedCallback((value) => {
    setKeyword(value);
    handleFilterChange("keyword", value);
  }, 1300);

  const [condition, setCondition] = useQueryState("condition", []);
  const [location, setLocation] = useQueryState("location", []);
  const [price, setPrice] = useQueryState("price", []);
  const safeCondition = Array.isArray(condition) ? condition : [];
  const safeLocation = Array.isArray(location) ? location : [];
  const safePrice = Array.isArray(price) ? price : [];
  const [minYear, setMinYear] = useQueryState("minYear", "");
  const [maxYear, setMaxYear] = useQueryState("maxYear", "");
  const [model, setModel] = useQueryState("model", []);

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
    "fuelConsumption",
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

  const safeModel = Array.isArray(model) ? model : [];

  const handleFilterChange = (filterKey, filterValue) => {
    setFilters((prevFilters) => ({
      ...(prevFilters || {}),
      [filterKey]: filterValue,
    }));
  };
  // Initialize local filters from URL params
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const initialFilters = Object.fromEntries(params.entries());
  setLocalFilters(initialFilters);
}, []);


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

      if (prevArray.includes(value)) {
        return prevArray.filter((item) => item !== value);
      }

      return [...prevArray, value];
    });
  };

  const FilterSection = ({ label, content, symbol, children }) => (
  <div className="group mb-6 relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
    <div className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
      <div
        className="flex cursor-pointer items-center justify-between p-6 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-blue-900 hover:from-violet-50 dark:hover:from-violet-900 border-b border-gray-100 dark:border-gray-800 transition-all duration-300"
        onClick={() => toggleSection(content)}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur opacity-30"></div>
            <div className="relative bg-gradient-to-br from-violet-500 to-purple-600 p-3 rounded-xl shadow-lg">
              <div className="text-white text-xl">
                {symbol}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">
              {label}
            </h3>
            <div className="h-0.5 w-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full opacity-60"></div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
          <div className={`relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-500 ${
            openSections.includes(content) ? "rotate-180 bg-violet-100 dark:bg-violet-900" : ""
          }`}>
            {/* IoMdArrowDropdown icon - replace with actual icon */}
            <div className="w-6 h-6 text-gray-700 dark:text-gray-300">▼</div>
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-500 ease-out ${
          openSections.includes(content) 
            ? "max-h-[600px] opacity-100" 
            : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const CustomCheckbox = ({ id, checked, onChange, label, className = "" }) => (
  <div className={`group flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 dark:hover:from-violet-900/20 dark:hover:to-purple-900/20 transition-all duration-300 border border-transparent hover:border-violet-200 dark:hover:border-violet-800 ${className}`}>
    <div className="relative flex-shrink-0">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div 
        className={`relative w-6 h-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg ${
          checked 
            ? 'bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 border-2 border-violet-400 shadow-violet-200 dark:shadow-violet-800' 
            : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-violet-400 dark:hover:border-violet-500 shadow-gray-200 dark:shadow-gray-800'
        }`}
        onClick={onChange}
      >
        {checked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-4 h-4 text-white font-bold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <div className={`absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg blur opacity-0 transition-opacity duration-300 ${checked ? 'opacity-20' : 'group-hover:opacity-10'}`}></div>
      </div>
    </div>
    <label htmlFor={id} className="text-base font-medium text-gray-800 dark:text-gray-200 cursor-pointer select-none flex-grow group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors duration-300">
      {label}
    </label>
  </div>
);

const PriceButton = ({ value, currentPrice, onClick, children }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
    <button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 border-2 shadow-lg ${
        currentPrice === value
          ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 text-white border-violet-400 shadow-violet-200 dark:shadow-violet-800'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-violet-300 dark:hover:border-violet-600 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 dark:hover:from-violet-900/20 dark:hover:to-purple-900/20 shadow-gray-200 dark:shadow-gray-800'
      }`}
    >
      {children}
    </button>
  </div>
);

return (
  <div className="space-y-4 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-transparent pr-2">
    {[
      {
        label: t("keyword"),
        content: "keyword",
        symbol: <VscSymbolKeyword />, // Replace with VscSymbolKeyword
        render: (
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <label htmlFor="keyword" className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Search Keywords
              </label>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition-all duration-300"></div>
              <div className="relative">
                <TextInput
                  type="text"
                  id="keyword"
                  value={keyword ?? ""}
                  placeholder="e.g., Toyota, BMW, Sedan..."
                  onChange={(e) => {
                    const value = e.target.value;
                    handleSearchDebounced(value);
                  }}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-base font-medium shadow-lg transition-all duration-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-500 text-xl">
                  <VscSymbolKeyword />
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        label: t("condition"),
        content: "condition",
        symbol: <FaRecycle />, 
        render: (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Vehicle Condition
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <CustomCheckbox
                id="new"
                checked={safeCondition.includes("new")}
                onChange={() => handleCheckboxChange(setCondition, "new")}
                label="New"
              />
              <CustomCheckbox
                id="used"
                checked={safeCondition.includes("used")}
                onChange={() => handleCheckboxChange(setCondition, "used")}
                label="Used"
              />
            </div>
          </div>
        ),
      },
      {
        label: t("location"),
        content: "location",
        symbol: <FaLocationDot />, // 
        render: (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Location
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <CustomCheckbox
                id="Cityville"
                checked={safeLocation.includes("Cityville")}
                onChange={() => handleCheckboxChange(setLocation, "Cityville")}
                label="Cityville"
              />
              <CustomCheckbox
                id="uk"
                checked={safeLocation.includes("uk")}
                onChange={() => handleCheckboxChange(setLocation, "uk")}
                label="United Kingdom"
              />
            </div>
          </div>
        ),
      },
      {
        label: t("price"),
        content: "price",
        symbol: <IoPricetag />, 
        render: (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Price Range
              </h4>
            </div>
            <div className="flex flex-wrap gap-4">
              <PriceButton
                value="18000"
                currentPrice={price}
                onClick={() => {
                  handleFilterChange("price", "18000");
                  setPrice("18000");
                }}
              >
                $18,000
              </PriceButton>
              <PriceButton
                value="20000"
                currentPrice={price}
                onClick={() => {
                  handleFilterChange("price", "20000");
                  setPrice("20000");
                }}
              >
                $20,000
              </PriceButton>
            </div>
          </div>
        ),
      },
      {
        label: t("year"),
        content: "year",
        symbol: <FaRegCalendarCheck />, 
        render: (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Manufacturing Year
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="minYear" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                  From Year
                </Label>
                <div className="relative group">
                  <TextInput
                    type="number"
                    name="minYear"
                    id="minYear"
                    value={minYear ?? ""}
                    placeholder="2010"
                    onChange={(e) => {
                      const value = e.target.value;
                      setMinYear(value);
                      handleFilterChange("minYear", value);
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium shadow-lg transition-all duration-300"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="maxYear" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  To Year
                </Label>
                <div className="relative group">
                  <TextInput
                    type="number"
                    name="maxYear"
                    id="maxYear"
                    value={maxYear}
                    placeholder="2024"
                    onChange={(e) => {
                      const value = e.target.value;
                      setMaxYear(value);
                      handleFilterChange("maxYear", value);
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium shadow-lg transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        label: "Model",
        content: "Model",
        symbol: <SiCmake />, 
        render: (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Car Models
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {["Corolla", "sequoio", "147", "146", "159"].map((value) => (
                <CustomCheckbox
                  key={value}
                  id={value}
                  checked={safeModel.includes(value)}
                  onChange={() => handleCheckboxChange(setModel, value)}
                  label={value}
                />
              ))}
            </div>
          </div>
        ),
      },
      {
        label: t("mileage"),
        content: "mileage",
        symbol: <IoIosSpeedometer />,
        render: (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Mileage Range
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="from" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                  {t("from")}
                </Label>
                <div className="relative group">
                  <Select
                    id="from"
                    value={millageFrom}
                    onChange={handleSelectChange(setMillageFrom)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                  >
                    <option value="">Any</option>
                    <option value="25000">25,000 km</option>
                    <option value="26000">26,000 km</option>
                    <option value="27000">27,000 km</option>
                  </Select>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="to" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  {t("to")}
                </Label>
                <div className="relative group">
                  <Select
                    id="to"
                    value={millageTo}
                    onChange={handleSelectChange(setMillageTo)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                  >
                    <option value="">Any</option>
                    <option value="24000">24,000 km</option>
                    <option value="26000">26,000 km</option>
                    <option value="27000">27,000 km</option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        label: t("gearbox"),
        content: "gearbox",
        symbol: <GiGearStickPattern />,
        render: (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Transmission Type
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <CustomCheckbox
                id="automatic"
                checked={safeGearBox.includes("automatic")}
                onChange={() => handleCheckboxChange(setGearBox, "automatic")}
                label="Automatic"
              />
              <CustomCheckbox
                id="manual"
                checked={safeGearBox.includes("manual")}
                onChange={() => handleCheckboxChange(setGearBox, "manual")}
                label="Manual"
              />
            </div>
          </div>
        ),
      },
      {
        label: t("body"),
        content: "bodytype",
        symbol: <GiCarDoor />,
        render: (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Body Style
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: "convertible", label: "Convertible" },
                { id: "coupe", label: "Coupe" },
                { id: "estate", label: "Estate" },
                { id: "hatchback", label: "Hatchback" },
                { id: "saloon", label: "Saloon" },
                { id: "suv", label: "SUV" },
              ].map(({ id, label }) => (
                <CustomCheckbox
                  key={id}
                  id={id}
                  checked={safebodyType.includes(id)}
                  onChange={() => handleCheckboxChange(setbodyType, id)}
                  label={label}
                />
              ))}
            </div>
          </div>
        ),
      },
      {
        label: t("color"),
        content: "color",
        symbol: <IoIosColorPalette />,
        render: (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Exterior Color
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: "black", label: "Black" },
                { id: "blue", label: "Blue" },
                { id: "gray", label: "Gray" },
                { id: "white", label: "White" },
                { id: "silver", label: "Silver" },
                { id: "red", label: "Red" },
                { id: "green", label: "Green" },
              ].map(({ id, label }) => (
                <CustomCheckbox
                  key={id}
                  id={id}
                  checked={safeColor.includes(id)}
                  onChange={() => handleCheckboxChange(setColor, id)}
                  label={label}
                />
              ))}
            </div>
          </div>
        ),
      },
      {
        label: t("doors"),
        content: "doors",
        symbol: <GiCarDoor />,
        render: (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Number of Doors
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "2", label: "2 Doors" },
                { id: "3", label: "3 Doors" },
                { id: "4", label: "4 Doors" },
                { id: "5", label: "5 Doors" },
              ].map(({ id, label }) => (
                <CustomCheckbox
                  key={id}
                  id={id}
                  checked={safeDoors.includes(id)}
                  onChange={() => handleCheckboxChange(setDoors, id)}
                  label={label}
                />
              ))}
            </div>
          </div>
        ),
      },
      {
        label: t("seats"),
        content: "Seats",
        symbol: <GiCarSeat />,
        render: (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Seating Capacity
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "2", label: "2 Seats" },
                { id: "3", label: "3 Seats" },
                { id: "4", label: "4 Seats" },
                { id: "5", label: "5 Seats" },
                { id: "7", label: "7 Seats" },
              ].map(({ id, label }) => (
                <CustomCheckbox
                  key={id}
                  id={id}
                  checked={safeSeats.includes(id)}
                  onChange={() => handleCheckboxChange(setSeats, id)}
                  label={label}
                />
              ))}
            </div>
          </div>
        ),
      },
      {
        label: t("fuel"),
        content: "fueltype",
        symbol: <GiGasPump />,
        render: (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Fuel Type
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: "petrol", label: "Petrol" },
                { id: "diesel", label: "Diesel" },
                { id: "electric", label: "Electric" },
                { id: "hybrid", label: "Hybrid" },
                { id: "bi-fuel", label: "Bi Fuel" },
              ].map(({ id, label }) => (
                <CustomCheckbox
                  key={id}
                  id={id}
                  checked={safeFuel.includes(id)}
                  onChange={() => handleCheckboxChange(setFuel, id)}
                  label={label}
                />
              ))}
            </div>
          </div>
        ),
      },
      {
        label: t("battery"),
        content: "battery",
        symbol: <GiBatteryPack />,
        render: (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Battery Range
              </h4>
            </div>
            <div className="space-y-3">
              <Label htmlFor="battery" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                Select Range
              </Label>
              <div className="relative group">
                <Select
                  id="battery"
                  value={battery}
                  onChange={handleSelectChange(setBattery)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                >
                  <option value="Any">Any Range</option>
                  <option value="100">0-100 Miles</option>
                  <option value="1000">100-200 Miles</option>
                  <option value="2000">200+ Miles</option>
                </Select>
              </div>
            </div>
          </div>
        ),
      },
      {
          label: t("charging"),
          content: "charging",
          symbol: <GiElectric />,
          render: (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Charging Speed
                </h4>
              </div>
              <div className="space-y-3">
                <Label htmlFor="charging" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                  Maximum Charging Rate
                </Label>
                <div className="relative group">
                  <Select
                    id="charging"
                    value={charging}
                    onChange={handleSelectChange(setCharging)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                  >
                    <option value="Any">Any Speed</option>
                    <option value="100">Standard (0-50kW)</option>
                    <option value="1000">Fast (50-150kW)</option>
                    <option value="2000">Rapid (150kW+)</option>
                  </Select>
                </div>
              </div>
            </div>
          ),
        },
        {
          label: t("engineSize"),
          content: "engine-size",
          symbol: <SiGoogleearthengine />,
          render: (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Engine Size Range
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="engine-from" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                    {t("from")}
                  </Label>
                  <div className="relative group">
                    <Select
                      id="engine-from"
                      value={engineSizeFrom}
                      onChange={handleSelectChange(setEngineSizeFrom)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                    >
                      <option value="">Any</option>
                      <option value="0">0.0L</option>
                      <option value="1">1.0L</option>
                      <option value="2">2.0L</option>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="engine-to" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    {t("to")}
                  </Label>
                  <div className="relative group">
                    <Select
                      id="engine-to"
                      value={engineSizeTo}
                      onChange={handleSelectChange(setEngineSizeTo)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                    >
                      <option value="">Any</option>
                      <option value="0">0.0L</option>
                      <option value="1">1.0L</option>
                      <option value="2">2.0L</option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          label: t("enginePower"),
          content: "engine-power",
          symbol: <GiPowerLightning />,
          render: (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Engine Power Range
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="engine-power-from" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                    {t("from")}
                  </Label>
                  <div className="relative group">
                    <Select
                      id="engine-power-from"
                      value={enginePowerFrom}
                      onChange={handleSelectChange(setEnginePowerFrom)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                    >
                      <option value="Any">Any</option>
                      <option value="50">50 bhp</option>
                      <option value="100">100 bhp</option>
                      <option value="150">150 bhp</option>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="engine-power-to" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    {t("to")}
                  </Label>
                  <div className="relative group">
                    <Select
                      id="engine-power-to"
                      value={enginePowerTo}
                      onChange={handleSelectChange(setEnginePowerTO)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                    >
                      <option value="Any">Any</option>
                      <option value="50">50 bhp</option>
                      <option value="100">100 bhp</option>
                      <option value="150">150 bhp</option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          label: t("fuelConsumption"),
          content: "fuel-comsumption",
          symbol: <FaHourglassEnd/>, // Replace with FaHourglassEnd
          render: (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Fuel Economy
                </h4>
              </div>
              <div className="space-y-3">
                <Label htmlFor="fuel-comsumption" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                  Minimum MPG
                </Label>
                <div className="relative group">
                  <Select
                    id="fuel-comsumption"
                    value={fuelConsumption}
                    onChange={handleSelectChange(setFuelConsumption)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                  >
                    <option value="Any">Any MPG</option>
                    <option value="30">30+ MPG</option>
                    <option value="40">40+ MPG</option>
                    <option value="50">50+ MPG</option>
                    <option value="60">60+ MPG</option>
                  </Select>
                </div>
              </div>
            </div>
          ),
        },
        {
          label: t("co2"),
          content: "c02-emission",
          symbol:<MdOutlineCo2 />,
          render: (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  CO2 Emissions
                </h4>
              </div>
              <div className="space-y-3">
                <Label htmlFor="c02-emission" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                  Maximum CO2 Output
                </Label>
                <div className="relative group">
                  <Select
                    id="c02-emission"
                    value={co2Emission}
                    onChange={handleSelectChange(setco2Emission)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                  >
                    <option value="Any">Any Emission</option>
                    <option value="30">Up to 30 g/km CO2</option>
                    <option value="75">Up to 75 g/km CO2</option>
                    <option value="100">Up to 100 g/km CO2</option>
                    <option value="110">Up to 110 g/km CO2</option>
                    <option value="120">Up to 120 g/km CO2</option>
                  </Select>
                </div>
              </div>
            </div>
          ),
        },
        {
          label: t("driveType"),
          content: "drive-type",
          symbol:<GiCarWheel />,
          render: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Drivetrain Configuration
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {driveTypeOptions.map((option) => (
                  <CustomCheckbox
                    key={option.id}
                    id={option.id}
                    checked={safedriveType.includes(option.id)}
                    onChange={() => handleCheckboxChange(setDrivetype, option.id)}
                    label={option.label}
                  />
                ))}
              </div>
            </div>
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

