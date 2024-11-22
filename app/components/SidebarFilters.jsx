"use client";
import { Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

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
    <div className="sticky top-3">
      {[
        { label: "Search By Keyword", content: "keyword" },
        { label: "Location", content: "location" },
        { label: "Year", content: "year" },
        { label: "Make", content: "make" },
        { label: "Model", content: "model" },
      ].map((section, index) => (
        <div key={index} className="mt-3">
          <div
            className="filter-header flex cursor-pointer flex-row items-center justify-between rounded-t-md bg-blue-950 px-5 py-3 dark:bg-gray-700"
            onClick={() => toggleSection(section.content)}
          >
            <h3 className="font-bold uppercase text-white">{section.label}</h3>
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
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
                <button className="rounded bg-blue-950 px-3 py-2 text-sm text-white transition-all hover:scale-95 hover:bg-pink-500 dark:bg-gray-700">
                  Alloy Wheels (1101)
                </button>
                <button className="rounded bg-blue-950 px-3 py-2 text-sm text-white transition-all hover:scale-95 hover:bg-pink-500 dark:bg-gray-700">
                  Alloy Wheels (1101)
                </button>
                <button className="rounded bg-blue-950 px-3 py-2 text-sm text-white transition-all hover:scale-95 hover:bg-pink-500 dark:bg-gray-700">
                  Alloy Wheels (1101)
                </button>
              </div>
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
          </div>
        </div>
      ))}

      <div className="mt-5 flex flex-col gap-3">
        <button className="rounded-sm bg-blue-950 px-5 py-3 text-sm uppercase text-white transition-all hover:scale-95 dark:bg-red-500">
          Apply Filter
        </button>
        <button className="rounded-sm border-2 border-blue-950 px-5 py-3 text-sm uppercase transition-all hover:scale-95 dark:border-red-500">
          Remove Filter
        </button>
      </div>
    </div>
  );
};

export default SidebarFilters;
