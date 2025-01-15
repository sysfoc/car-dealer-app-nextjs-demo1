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
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [activeSection, setActiveSection] = useState("Logo");
  const [previewLogo, setPreviewLogo] = useState("/logo.png");
  const [previewFavicon, setPreviewFavicon] = useState("/logo.png");
  const [darkModeSwitch, setdarkModeSwitch] = useState(false);
  const [favouriteSwitch, setFavouriteSwitch] = useState(false);
  const [logoSwitch, setLogoSwitch] = useState(false);

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
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="logoBtn"
                      checked={logoSwitch}
                      onChange={() => setLogoSwitch(!logoSwitch)}
                    />
                    <Label htmlFor="logoBtn" className="flex">
                      Hide Logo from the Header
                    </Label>
                  </div>
                </div>
              )}
              {activeSection === "Footer" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <Label htmlFor="footer-col-1-heading">
                      Footer Column 1 - Heading
                    </Label>
                    <TextInput
                      type="text"
                      placeholder="Menu Links"
                      id="footer-col-1-heading"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="footer-col-2-heading">
                      Footer Column 2 - Heading
                    </Label>
                    <TextInput
                      type="text"
                      placeholder="Departments"
                      id="footer-col-2-heading"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="footer-col-3-heading">
                      Footer Column 3 - Heading
                    </Label>
                    <TextInput
                      placeholder="Language"
                      type="text"
                      id="footer-col-3-heading"
                    />
                  </div>
                </div>
              )}
              {activeSection === "Google Recaptcha" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <Label htmlFor="recaptcha">Google Recaptcha Site Key</Label>
                    <TextInput id="recaptcha" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="recatpcha-status">
                      Google Recaptcha Status
                    </Label>
                    <Select id="recatpcha-status">
                      <option value="inactive">Inactive</option>
                      <option value="active">Active</option>
                    </Select>
                  </div>
                </div>
              )}
              {activeSection === "Google Analytics" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <Label htmlFor="analytic">
                      Google Analytic Tracking ID
                    </Label>
                    <TextInput id="analytic" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="analytic-status">
                      Google Analytic Status
                    </Label>
                    <Select id="analytic-status">
                      <option value="inactive">Inactive</option>
                      <option value="active">Active</option>
                    </Select>
                  </div>
                </div>
              )}
              {activeSection === "Cookie Consent" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <Label htmlFor="cookie-message">
                      Cookie Consent Message
                    </Label>
                    <Textarea id="cookie-message" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="cookie-button-text">
                      Cookie Consent Button Text
                    </Label>
                    <TextInput
                      id="cookie-button-text"
                      type="text"
                      value={"ACCEPT"}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="cookie-text-color">
                      Cookie Consent Text Color
                    </Label>
                    <input
                      id="cookie-text-color"
                      type="color"
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="cookie-bg-color">
                      Cookie Consent Background Color
                    </Label>
                    <input
                      id="cookie-bg-color"
                      type="color"
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="cookie-button-text-color">
                      Cookie Consent Button Text Color
                    </Label>
                    <input
                      id="cookie-button-text-color"
                      type="color"
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="cookie-button-bg-color">
                      Cookie Consent Button Background Color
                    </Label>
                    <input
                      id="cookie-button-bg-color"
                      type="color"
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="cookie-consent-status">
                      Cookie Consent Status
                    </Label>
                    <Select id="cookie-consent-status">
                      <option value="inactive">Inactive</option>
                      <option value="active">Active</option>
                    </Select>
                  </div>
                </div>
              )}
              {activeSection === "Theme Colors" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <Label htmlFor="dark-mode-bg-color">
                      Dark Mode Background Color
                    </Label>
                    <input
                      id="dark-mode-bg-color"
                      type="color"
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="dark-mode-text-color">
                      Dark Mode Text Color
                    </Label>
                    <input
                      id="dark-mode-text-color"
                      type="color"
                      className="w-full"
                    />
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
