"use client";
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import React from "react";
import { useState } from "react";
const Page = () => {
  const [activeSection, setActiveSection] = useState("Currency");
  return (
    <section className="my-10">
      <div>
        <h2 className="text-2xl font-semibold">Default Settings</h2>
        <div className="mt-5 flex flex-row flex-wrap gap-5 sm:flex-nowrap">
          <div className="flex w-full flex-col gap-y-2 sm:w-2/6">
            {[
              "Currency",
              "Distance",
              "Dealer Address",
              "Dealer License No",
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
              {activeSection === "Currency" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="currency" className="flex">
                      Default Currency:
                    </Label>
                    <Select id="currency" name="currency">
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </Select>
                  </div>
                </div>
              )}
              {activeSection === "Distance" && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="distance">
                    Default Distance measurement:
                  </Label>
                  <Select id="distance" name="distance">
                    <option value="km">Km</option>
                    <option value="miles">Miles</option>
                  </Select>
                </div>
              )}
              {activeSection === "Dealer Address" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="address" className="flex">
                      Dealer Address (Embedded Google Maps Link):
                    </Label>
                    <Textarea
                      id="address"
                      rows={8}
                      placeholder='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.3833161665298!2d-118.03745848530627!3d33.85401093559897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd2c6c97f8f3ed%3A0x47b1bde165dcc056!2sOak+Dr%2C+La+Palma%2C+CA+90623%2C+USA!5e0!3m2!1sen!2sbd!4v1544238752504" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
                    />
                  </div>
                </div>
              )}
              {activeSection === "Dealer License No" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="license" className="flex">
                      Dealer License No:
                    </Label>
                    <TextInput
                      id="license"
                      name="license"
                      placeholder="ABCD12345678"
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <Button type="submit" className="mt-3 w-full" color={"dark"}>
          Save Settings
        </Button>
      </div>
    </section>
  );
};

export default Page;
