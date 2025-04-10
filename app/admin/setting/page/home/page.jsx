"use client";

import { Button, Textarea, TextInput, Select, Label } from "flowbite-react";
import React, { useState, useRef } from "react";

const Page = () => {
  const [activeSection, setActiveSection] = useState("SEO Section");

  const refs = {
    title: useRef(null),
    metaDescription: useRef(null),
    searchHeading: useRef(null),
    searchText: useRef(null),
    brandHeading: useRef(null),
    brandSubheading: useRef(null),
    brandItems: useRef(null),
    brandStatus: useRef(null),
    listingHeading: useRef(null),
    listingSubheading: useRef(null),
    listingItems: useRef(null),
    listingStatus: useRef(null),
    chooseusHeading: useRef(null),
    chooseusFirstHeading: useRef(null),
    chooseusFirstDescription: useRef(null),
    chooseusSecondHeading: useRef(null),
    chooseusSecondDescription: useRef(null),
    chooseusThirdHeading: useRef(null),
    chooseusThirdDescription: useRef(null),
    chooseusFourthHeading: useRef(null),
    chooseusFourthDescription: useRef(null),
    mondayHr: useRef(null),
    tuesdayHr: useRef(null),
    wednesdayHr: useRef(null),
    thursdayHr: useRef(null),
    fridayHr: useRef(null),
    saturdayHr: useRef(null),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("seoTitle", refs.title.current?.value || "");
    formData.append(
      "seoDescription",
      refs.metaDescription.current?.value || "",
    );
    formData.append("searchHeading", refs.searchHeading.current?.value || "");
    formData.append("searchText", refs.searchText.current?.value || "");
    formData.append("brandHeading", refs.brandHeading.current?.value || "");
    formData.append(
      "brandSubheading",
      refs.brandSubheading.current?.value || "",
    );
    formData.append("brandItems", refs.brandItems.current?.value || "");
    formData.append("brandStatus", refs.brandStatus.current?.value || "");
    formData.append("listingHeading", refs.listingHeading.current?.value || "");
    formData.append(
      "listingSubheading",
      refs.listingSubheading.current?.value || "",
    );
    formData.append("listingItems", refs.listingItems.current?.value || "");
    formData.append("listingStatus", refs.listingStatus.current?.value || "");
    formData.append(
      "chooseusHeading",
      refs.chooseusHeading.current?.value || "",
    );
    formData.append(
      "chooseusFirstHeading",
      refs.chooseusFirstHeading.current?.value || "",
    );
    formData.append(
      "chooseusFirstDescription",
      refs.chooseusFirstDescription.current?.value || "",
    );
    formData.append(
      "chooseusSecondHeading",
      refs.chooseusSecondHeading.current?.value || "",
    );
    formData.append(
      "chooseusSecondDescription",
      refs.chooseusSecondDescription.current?.value || "",
    );
    formData.append(
      "chooseusThirdHeading",
      refs.chooseusThirdHeading.current?.value || "",
    );
    formData.append(
      "chooseusThirdDescription",
      refs.chooseusThirdDescription.current?.value || "",
    );
    formData.append(
      "chooseusFourthHeading",
      refs.chooseusFourthHeading.current?.value || "",
    );
    formData.append(
      "chooseusFourthDescription",
      refs.chooseusFourthDescription.current?.value || "",
    );
    formData.append("mondayHr", refs.mondayHr.current?.value || "");
    formData.append("tuesdayHr", refs.tuesdayHr.current?.value || "");
    formData.append("wednesdayHr", refs.wednesdayHr.current?.value || "");
    formData.append("thursdayHr", refs.thursdayHr.current?.value || "");
    formData.append("fridayHr", refs.fridayHr.current?.value || "");
    formData.append("saturdayHr", refs.saturdayHr.current?.value || "");

    const response = await fetch("/api/homepage", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      alert("Data saved or updated successfully!");
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <section className="my-10">
      <div>
        <h2 className="text-2xl font-semibold">Edit Homepage</h2>
        <div className="mt-5 flex flex-row flex-wrap gap-5 sm:flex-nowrap">
          <div className="flex w-full flex-col gap-y-2 sm:w-2/6">
            {[
              "SEO Section",
              "Search Section",
              "Brand Section",
              "Listing Section",
              "Chooseus Section",
              "Footer",
            ].map((section) => (
              <div
                key={section}
                className={`w-full cursor-pointer rounded-md p-3 text-white ${
                  activeSection === section
                    ? "bg-blue-950 dark:bg-red-500"
                    : "bg-blue-950/70 hover:bg-blue-950 dark:bg-red-500/70 dark:hover:dark:bg-red-500"
                }`}
                onClick={() => setActiveSection(section)}
              >
                <span>{section}</span>
              </div>
            ))}
          </div>

          <div className="w-full sm:w-4/6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
              {activeSection === "SEO Section" && (
                <div>
                  <Label htmlFor="title">Title:</Label>
                  <TextInput type="text" id="title" ref={refs.title} />
                  <Label htmlFor="meta-description">Meta Description:</Label>
                  <Textarea
                    id="meta-description"
                    rows={5}
                    ref={refs.metaDescription}
                  />
                </div>
              )}

              {activeSection === "Search Section" && (
                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="search-heading">Search Heading:</Label>
                  <Textarea
                    id="search-heading"
                    rows={2}
                    ref={refs.searchHeading}
                  />
                  <Label htmlFor="search-text">Search Text:</Label>
                  <Textarea id="search-text" rows={2} ref={refs.searchText} />
                </div>
              )}

              {activeSection === "Brand Section" && (
                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="brand-heading">Heading:</Label>
                  <TextInput
                    placeholder="Brand Heading"
                    ref={refs.brandHeading}
                  />
                  <Label htmlFor="brand-subheading">Subheading:</Label>
                  <TextInput
                    placeholder="Brand Subheading"
                    ref={refs.brandSubheading}
                  />
                  <Label htmlFor="brand-items">Items:</Label>
                  <TextInput
                    type="number"
                    placeholder="Items"
                    ref={refs.brandItems}
                  />
                  <Select ref={refs.brandStatus}>
                    <option value="inactive">Inactive</option>
                    <option value="active">Active</option>
                  </Select>
                </div>
              )}

              {activeSection === "Listing Section" && (
                <div flex flex-col gap-3>
                  <Label htmlFor="listing-heading">Heading:</Label>
                  <TextInput
                    placeholder="Listing Heading"
                    ref={refs.listingHeading}
                  />
                  <Label htmlFor="listing-subheading">Subheading:</Label>
                  <TextInput
                    placeholder="Listing Subheading"
                    ref={refs.listingSubheading}
                  />
                  <Label htmlFor="listing-items">Total Items:</Label>
                  <TextInput
                    type="number"
                    placeholder="Items"
                    ref={refs.listingItems}
                  />
                  <Label htmlFor="listing-status">Status:</Label>
                  <Select ref={refs.listingStatus}>
                    <option value="inactive">Inactive</option>
                    <option value="active">Active</option>
                  </Select>
                </div>
              )}

              {activeSection === "Chooseus Section" && (
                <div className="flex flex-col gap-3">
                  <Label htmlFor="chooseus-heading">Heading</Label>
                  <TextInput
                    placeholder="Choose Us Heading"
                    ref={refs.chooseusHeading}
                  />
                  <Label htmlFor="chooseus-first-heading">
                    First Section Heading
                  </Label>
                  <TextInput
                    placeholder="First Heading"
                    ref={refs.chooseusFirstHeading}
                  />
                  <Label htmlFor="chooseus-first-description">
                    First Section Description
                  </Label>
                  <Textarea
                    rows={2}
                    placeholder="First Description"
                    ref={refs.chooseusFirstDescription}
                  />
                  <Label htmlFor="chooseus-second-heading">
                    Second Section Heading
                  </Label>
                  <TextInput
                    placeholder="Second Heading"
                    ref={refs.chooseusSecondHeading}
                  />
                  <Label htmlFor="chooseus-second-description">
                    Second Section Description
                  </Label>
                  <Textarea
                    rows={2}
                    placeholder="Second Description"
                    ref={refs.chooseusSecondDescription}
                  />
                  <Label htmlFor="chooseus-third-heading">
                    Third Section Heading
                  </Label>{" "}
                  <TextInput
                    placeholder="Third Heading"
                    ref={refs.chooseusThirdHeading}
                  />
                  <Label htmlFor="chooseus-third-description">
                    Third Section Description
                  </Label>{" "}
                  <Textarea
                    rows={2}
                    placeholder="Third Description"
                    ref={refs.chooseusThirdDescription}
                  />
                  <TextInput
                    placeholder="Fourth Heading"
                    ref={refs.chooseusFourthHeading}
                  />
                  <Label htmlFor="chooseus-fourth-description">
                    Fourth Section Description
                  </Label>
                  <Textarea
                    rows={2}
                    placeholder="Fourth Description"
                    ref={refs.chooseusFourthDescription}
                  />
                </div>
              )}

              {activeSection === "Footer" && (
                <div className="flex flex-col gap-2">
                  <TextInput placeholder="Monday Hours" ref={refs.mondayHr} />
                  <TextInput placeholder="Tuesday Hours" ref={refs.tuesdayHr} />
                  <TextInput
                    placeholder="Wednesday Hours"
                    ref={refs.wednesdayHr}
                  />
                  <TextInput
                    placeholder="Thursday Hours"
                    ref={refs.thursdayHr}
                  />
                  <TextInput placeholder="Friday Hours" ref={refs.fridayHr} />
                  <TextInput
                    placeholder="Saturday Hours"
                    ref={refs.saturdayHr}
                  />
                </div>
              )}

              <Button type="submit" className="mt-4 w-fit">
                Save
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
