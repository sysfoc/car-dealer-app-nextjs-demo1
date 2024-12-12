"use client";
import { Select } from "flowbite-react";
import React from "react";

const LanguageSwitching = () => {
  const handleLanguageChange = (event) => {
    const language = event.target.value;

    // Set the language cookie with 1 year expiration
    document.cookie = `language=${language}; path=/; max-age=31536000`; // 1 year expiration

    // Refresh the page to apply the new language
    window.location.reload(); // Trigger a page reload to apply language change
  };

  return (
    <Select onChange={handleLanguageChange}>
      <option disabled selected>
        Select Language
      </option>
      <option value="en">English</option>
      <option value="ur">Urdu</option>
      <option value="fr">French</option>
    </Select>
  );
};

export default LanguageSwitching;
