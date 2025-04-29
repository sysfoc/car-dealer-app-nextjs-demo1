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
import React, { useEffect, useState } from "react";

const Page = () => {
  const [activeSection, setActiveSection] = useState("Logo");
  const [settings, setSettings] = useState({
    logo: "/logo.png",
    favicon: "/logo.png",
    top: {
      hideDarkMode: false,
      hideFavourite: false,
      hideLogo: false,
    },
    footer: {
      col1Heading: "",
      col2Heading: "",
      col3Heading: "",
    },
    recaptcha: {
      siteKey: "",
      status: "inactive",
    },
    analytics: {
      trackingId: "",
      status: "inactive",
    },
    cookieConsent: {
      message: "",
      buttonText: "ACCEPT",
      textColor: "#000000",
      bgColor: "#ffffff",
      buttonTextColor: "#ffffff",
      buttonBgColor: "#000000",
      status: "inactive",
    },
    themeColor: {
      darkModeBg: "#000000",
      darkModeText: "#ffffff",
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings/general');
        const data = await response.json();

        if (data.settings) {
          setSettings(prev => ({
            ...prev,
            ...data.settings,
            top: { ...prev.top, ...(data.settings.top || {}) },
            footer: { ...prev.footer, ...(data.settings.footer || {}) },
            recaptcha: { ...prev.recaptcha, ...(data.settings.recaptcha || {}) },
            analytics: { ...prev.analytics, ...(data.settings.analytics || {}) },
            cookieConsent: {
              ...prev.cookieConsent,
              ...(data.settings.cookieConsent || {})
            },
            themeColor: {
              ...prev.themeColor,
              ...(data.settings.themeColor || {})
            },
            logo: data.settings.logo || "/logo.png",
            favicon: data.settings.favicon || "/logo.png",
          }));
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleFileChange = async (type, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSettings(prev => ({
          ...prev,
          [type]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/settings/general', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Settings saved:', data);
        alert('Settings saved successfully!');
      } else {
        console.error('Failed to save settings');
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings/general");  
        const data = await response.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error("Error fetching settings", error);
      }
    };

    fetchSettings();
  }, []);

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
                className={`w-full cursor-pointer rounded-md p-3 text-white ${activeSection === section
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
                  <div className="relative w-[150px] h-[150px] my-3">
                    <Image
                      fill
                      alt="logo"
                      src={settings.logo}
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 150px"
                    />
                  </div>
                  <Label htmlFor="logo">Change Logo:</Label>
                  <FileInput
                    id="logo"
                    accept="image/*"
                    onChange={(e) => handleFileChange('logo', e)}
                  />
                </div>
              )}

              {activeSection === "Favicon" && (
                <div>
                  <p className="font-semibold">Existing Favicon</p>
                  <div className="relative w-[150px] h-[150px] my-3">
                    <Image
                      fill
                      alt="favicon"
                      src={settings.favicon}
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 150px"
                    />
                  </div>
                  <Label htmlFor="favicon">Change Favicon:</Label>
                  <FileInput
                    id="favicon"
                    accept="image/*"
                    onChange={(e) => handleFileChange('favicon', e)}
                  />
                </div>
              )}

              {activeSection === "Top" && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="darkMode"
                      checked={settings.top.hideDarkMode}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        top: {
                          ...prev.top,
                          hideDarkMode: e.target.checked
                        }
                      }))}
                    />
                    <Label htmlFor="darkMode">
                      Hide Dark mode button from Header
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="favouriteBtn"
                      checked={settings.top.hideFavourite}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        top: {
                          ...prev.top,
                          hideFavourite: e.target.checked
                        }
                      }))}
                    />
                    <Label htmlFor="favouriteBtn">
                      Hide Favourite button from Header
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="logoBtn"
                      checked={settings.top.hideLogo}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        top: {
                          ...prev.top,
                          hideLogo: e.target.checked
                        }
                      }))}
                    />
                    <Label htmlFor="logoBtn">
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
                      value={settings.footer.col1Heading}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          col1Heading: e.target.value
                        }
                      }))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="footer-col-2-heading">
                      Footer Column 2 - Heading
                    </Label>
                    <TextInput
                      value={settings.footer.col2Heading}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          col2Heading: e.target.value
                        }
                      }))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="footer-col-3-heading">
                      Footer Column 3 - Heading
                    </Label>
                    <TextInput
                      value={settings.footer.col3Heading}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          col3Heading: e.target.value
                        }
                      }))}
                    />
                  </div>
                </div>
              )}

              {activeSection === "Google Recaptcha" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <Label htmlFor="recaptcha">Google Recaptcha Site Key</Label>
                    <TextInput
                      id="recaptcha"
                      value={settings.recaptcha.siteKey}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        recaptcha: {
                          ...prev.recaptcha,
                          siteKey: e.target.value
                        }
                      }))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="recaptcha-status">
                      Google Recaptcha Status
                    </Label>
                    <Select
                      id="recaptcha-status"
                      value={settings.recaptcha.status}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        recaptcha: {
                          ...prev.recaptcha,
                          status: e.target.value
                        }
                      }))}
                    >
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
                    <TextInput
                      id="analytic"
                      value={settings.analytics.trackingId}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        analytics: {
                          ...prev.analytics,
                          trackingId: e.target.value
                        }
                      }))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="analytic-status">
                      Google Analytic Status
                    </Label>
                    <Select
                      id="analytic-status"
                      value={settings.analytics.status}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        analytics: {
                          ...prev.analytics,
                          status: e.target.value
                        }
                      }))}
                    >
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
                    <Textarea
                      id="cookie-message"
                      value={settings.cookieConsent.message}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        cookieConsent: {
                          ...prev.cookieConsent,
                          message: e.target.value
                        }
                      }))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="cookie-button-text">
                      Cookie Consent Button Text
                    </Label>
                    <TextInput
                      id="cookie-button-text"
                      value={settings.cookieConsent.buttonText}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        cookieConsent: {
                          ...prev.cookieConsent,
                          buttonText: e.target.value
                        }
                      }))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="cookie-text-color">
                      Cookie Consent Text Color
                    </Label>
                    <input
                      id="cookie-text-color"
                      type="color"
                      value={settings.cookieConsent.textColor}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        cookieConsent: {
                          ...prev.cookieConsent,
                          textColor: e.target.value
                        }
                      }))}
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
                      value={settings.cookieConsent.bgColor}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        cookieConsent: {
                          ...prev.cookieConsent,
                          bgColor: e.target.value
                        }
                      }))}
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
                      value={settings.cookieConsent.buttonTextColor}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        cookieConsent: {
                          ...prev.cookieConsent,
                          buttonTextColor: e.target.value
                        }
                      }))}
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
                      value={settings.cookieConsent.buttonBgColor}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        cookieConsent: {
                          ...prev.cookieConsent,
                          buttonBgColor: e.target.value
                        }
                      }))}
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="cookie-consent-status">
                      Cookie Consent Status
                    </Label>
                    <Select
                      id="cookie-consent-status"
                      value={settings.cookieConsent.status}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        cookieConsent: {
                          ...prev.cookieConsent,
                          status: e.target.value
                        }
                      }))}
                    >
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
                      value={settings.themeColor.darkModeBg}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        themeColor: {
                          ...prev.themeColor,
                          darkModeBg: e.target.value
                        }
                      }))}
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
                      value={settings.themeColor.darkModeText}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        themeColor: {
                          ...prev.themeColor,
                          darkModeText: e.target.value
                        }
                      }))}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <Button className="mt-3 w-full" color={"dark"} onClick={handleSubmit}>
          Save Settings
        </Button>
      </div>
    </section>
  );
};

export default Page;