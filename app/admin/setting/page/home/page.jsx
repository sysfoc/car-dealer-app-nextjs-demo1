"use client";
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [activeSection, setActiveSection] = useState("SEO Section");
  const [previewBackgroundImage, setpreviewBackgroundImage] =
    useState("/Luxury SUV.webp");
  const handleBackgroundImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setpreviewBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
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
            <form>
              {activeSection === "SEO Section" && (
                <div className="flex flex-col gap-y-3">
                  <div>
                    <Label htmlFor="title">Title:</Label>
                    <TextInput
                      type="text"
                      id="title"
                      placeholder="yourcompany - your meta title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="meta-description">Meta Description:</Label>
                    <Textarea
                      id="meta-description"
                      placeholder="Your meta description"
                      rows={5}
                    />
                  </div>
                </div>
              )}
              {activeSection === "Search Section" && (
                <div className="flex flex-col gap-y-3">
                  <div>
                    <Label htmlFor="search-heading">Search Heading:</Label>
                    <Textarea
                      id="search-heading"
                      placeholder="Find Your Perfect Car"
                      rows={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="search-text">Search Text:</Label>
                    <Textarea
                      id="search-text"
                      placeholder="Find cars for sale and for rent near you"
                      rows={5}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Existing Background Image</p>
                    <Image
                      width={150}
                      height={150}
                      alt="background-image"
                      src={previewBackgroundImage}
                      className="my-3"
                    />
                    <Label htmlFor="logo">Change Background Image:</Label>
                    <FileInput
                      id="logo"
                      accept="image/*"
                      onChange={handleBackgroundImageChange}
                    />
                  </div>
                </div>
              )}
              {activeSection === "Brand Section" && (
                <div className="flex flex-col gap-3">
                  <div>
                    <Label htmlFor="brand-heading">Heading:</Label>
                    <TextInput
                      type="text"
                      id="brand-heading"
                      placeholder="Explore Our Premium Brands"
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand-subheading">Subheading:</Label>
                    <TextInput
                      type="text"
                      id="brand-subheading"
                      placeholder="See All"
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand-items">Total Items:</Label>
                    <TextInput type="number" id="brand-items" placeholder="5" />
                  </div>
                  <div>
                    <Label htmlFor="brand-status">Status:</Label>
                    <Select id="brand-status">
                      <option value="inactive">Inactive</option>
                      <option value="active">Active</option>
                    </Select>
                  </div>
                </div>
              )}
              {activeSection === "Listing Section" && (
                <div className="flex flex-col gap-3">
                  <div>
                    <Label htmlFor="listing-heading">Heading:</Label>
                    <TextInput
                      type="text"
                      id="listing-heading"
                      placeholder="Explore All Vehicles"
                    />
                  </div>
                  <div>
                    <Label htmlFor="listing-subheading">Subheading:</Label>
                    <TextInput
                      type="text"
                      id="listing-subheading"
                      placeholder="See All"
                    />
                  </div>
                  <div>
                    <Label htmlFor="listing-items">Total Items:</Label>
                    <TextInput
                      type="number"
                      id="listing-items"
                      placeholder="4"
                    />
                  </div>
                  <div>
                    <Label htmlFor="listing-status">Status:</Label>
                    <Select id="listing-status">
                      <option value="inactive">Inactive</option>
                      <option value="active">Active</option>
                    </Select>
                  </div>
                </div>
              )}
              {activeSection === "Chooseus Section" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <Label htmlFor="chooseus-heading">Heading</Label>
                    <TextInput
                      id="chooseus-heading"
                      type="text"
                      placeholder="Why Choose Us?"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="chooseus-first-heading">
                      First Section Heading
                    </Label>
                    <TextInput
                      id="chooseus-first-heading"
                      type="text"
                      placeholder="Special Financing Offers"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="chooseus-first-description">
                      First Section Description
                    </Label>
                    <Textarea
                      id="chooseus-first-description"
                      type="text"
                      placeholder="Our stress-free finance department that can find financial solutions."
                      rows={5}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="chooseus-second-heading">
                      Second Section Heading
                    </Label>
                    <TextInput
                      id="chooseus-second-heading"
                      type="text"
                      placeholder="Trusted Car Dealership"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="chooseus-second-description">
                      Second Section Description
                    </Label>
                    <Textarea
                      id="chooseus-second-description"
                      type="text"
                      placeholder="Our stress-free finance department that can find financial solutions to save."
                      rows={5}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="chooseus-third-heading">
                      Third Section Heading
                    </Label>
                    <TextInput
                      id="chooseus-third-heading"
                      type="text"
                      placeholder="Trusted Car Dealership"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="chooseus-third-description">
                      Third Section Description
                    </Label>
                    <Textarea
                      id="chooseus-third-description"
                      type="text"
                      placeholder="Our stress-free finance department that can find financial solutions to save."
                      rows={5}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="chooseus-fourth-heading">
                      Fourth Section Heading
                    </Label>
                    <TextInput
                      id="chooseus-fourth-heading"
                      type="text"
                      placeholder="Trusted Car Dealership"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="chooseus-fourth-description">
                      Fourth Section Description
                    </Label>
                    <Textarea
                      id="chooseus-fourth-description"
                      type="text"
                      placeholder="Our stress-free finance department that can find financial solutions to save."
                      rows={5}
                    />
                  </div>
                </div>
              )}
              {activeSection === "Footer" && (
                <div>
                  <div className="flex flex-col">
                    <p>Trading hours</p>
                    <div className="mt-3 flex flex-col gap-3">
                      <div>
                        <Label htmlFor="monday-hr">Moday</Label>
                        <TextInput
                          type="text"
                          id="monday-hr"
                          placeholder="9:00 AM - 5:00 PM"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tuesday-hr">Tuesday</Label>
                        <TextInput
                          type="text"
                          id="tuesday-hr"
                          placeholder="9:00 AM - 5:00 PM"
                        />
                      </div>
                      <div>
                        <Label htmlFor="wednesday-hr">Wednesday</Label>
                        <TextInput
                          type="text"
                          id="wednesday-hr"
                          placeholder="9:00 AM - 5:00 PM"
                        />
                      </div>
                      <div>
                        <Label htmlFor="thursday-hr">Thursday</Label>
                        <TextInput
                          type="text"
                          id="thursday-hr"
                          placeholder="9:00 AM - 5:00 PM"
                        />
                      </div>
                      <div>
                        <Label htmlFor="friday-hr">Friday</Label>
                        <TextInput
                          type="text"
                          id="friday-hr"
                          placeholder="9:00 AM - 5:00 PM"
                        />
                      </div>
                      <div>
                        <Label htmlFor="saturday-hr">Saturday</Label>
                        <TextInput
                          type="text"
                          id="saturday-hr"
                          placeholder="Closed"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sunday-hr">Sunday</Label>
                        <TextInput
                          type="text"
                          id="sunday-hr"
                          placeholder="Closed"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <Button className="mt-3 w-full" color={"dark"}>
          Save Settings
        </Button>
      </div>
    </section>
  );
};

export default Page;
