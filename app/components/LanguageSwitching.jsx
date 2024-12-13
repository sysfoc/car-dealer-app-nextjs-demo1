"use client";
import { Select } from "flowbite-react";
import React, { useEffect, useState } from "react";

const LanguageSwitching = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const getCookieValue = (name) => {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match ? match[2] : "en";
    };

    const language = getCookieValue("language");
    setSelectedLanguage(language);
  }, []);

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    document.cookie = `language=${language}; path=/; max-age=31536000`;
    setSelectedLanguage(language);
    window.location.reload();
  };

  return (
    <Select value={selectedLanguage} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="ur">Urdu</option>
      <option value="fr">French</option>
    </Select>
  );
};

export default LanguageSwitching;
