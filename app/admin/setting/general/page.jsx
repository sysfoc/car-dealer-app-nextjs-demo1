"use client";
import { Checkbox, FileInput, Label, ToggleSwitch } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [activeSection, setActiveSection] = useState("Logo");
  const [previewLogo, setPreviewLogo] = useState("/logo.png");
  const [previewFavicon, setPreviewFavicon] = useState("/logo.png");
  const [darkModeSwitch, setdarkModeSwitch] = useState(false);
  const [favouriteSwitch, setFavouriteSwitch] = useState(false);

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFaviconChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewFavicon(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="my-10">
      <div>
        <h2 className="text-2xl font-semibold">Edit General Settings</h2>
        <div className="mt-5 flex flex-row flex-wrap gap-5 sm:flex-nowrap">
          <div className="flex w-full flex-col gap-y-2 sm:w-2/6">
            {[
              "Logo",
              "Favicon",
              "Top",
              "Footer",
              "Google Recaptcha",
              "Google Analytics",
              "Cookie Consent",
              "Theme Colors",
            ].map((section) => (
              <div
                key={section}
                className={`w-full cursor-pointer rounded-md p-3 text-white ${
                  activeSection === section
                    ? "bg-blue-950"
                    : "bg-blue-950/70 hover:bg-blue-950"
                }`}
                onClick={() => setActiveSection(section)}
              >
                <span>{section}</span>
              </div>
            ))}
          </div>
          <div className="w-full sm:w-4/6">
            <form>
              {activeSection === "Logo" && (
                <div>
                  <p className="font-semibold">Existing Logo</p>
                  <Image
                    width={150}
                    height={150}
                    alt="logo"
                    src={previewLogo}
                    className="my-3"
                  />
                  <Label htmlFor="logo">Change Logo:</Label>
                  <FileInput
                    id="logo"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                </div>
              )}
              {activeSection === "Favicon" && (
                <div>
                  <p className="font-semibold">Existing Favicon</p>
                  <Image
                    width={150}
                    height={150}
                    alt="logo"
                    src={previewFavicon}
                    className="my-3"
                  />
                  <Label htmlFor="logo">Change Favicon:</Label>
                  <FileInput
                    id="logo"
                    accept="image/*"
                    onChange={handleFaviconChange}
                  />
                </div>
              )}
              {activeSection === "Top" && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="darkMode"
                      checked={darkModeSwitch}
                      onChange={() => setdarkModeSwitch(!darkModeSwitch)}
                    />
                    <Label htmlFor="darkMode" className="flex">
                      Hide Dark mode button from Header
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="favouriteBtn"
                      checked={favouriteSwitch}
                      onChange={() => setFavouriteSwitch(!favouriteSwitch)}
                    />
                    <Label htmlFor="favouriteBtn" className="flex">
                      Hide Favourite button from Header
                    </Label>
                  </div>
                </div>
              )}
              {activeSection === "Footer" && <div>Footer Section Content</div>}
              {activeSection === "Google Recaptcha" && (
                <div>Google Recaptcha Settings</div>
              )}
              {activeSection === "Google Analytics" && (
                <div>Google Analytics Settings</div>
              )}
              {activeSection === "Cookie Consent" && (
                <div>Cookie Consent Settings</div>
              )}
              {activeSection === "Theme Colors" && (
                <div>Theme Colors Settings</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Page;
