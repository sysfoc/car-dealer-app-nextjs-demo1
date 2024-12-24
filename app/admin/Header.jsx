"use client";
import React from "react";
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  DropdownHeader,
  Navbar,
  NavbarBrand,
} from "flowbite-react";
import Image from "next/image";

const Header = ({ isDarkMode }) => {
  return (
    <Navbar
      fluid
      rounded
      className="border-b border-gray-300 dark:border-gray-700 dark:shadow-xl"
    >
      <NavbarBrand href="/admin/dashboard">
        <Image
          src={isDarkMode ? "/logo-white.png" : "/logo.png"}
          alt="Sysfoc-cars-dealer"
          width={80}
          height={50}
          style={{ objectPosition: "center" }}
          className="size-auto"
        />
      </NavbarBrand>
      <div className="flex items-center gap-x-5 md:order-2">
        <DarkThemeToggle />
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Hamza Ilyas</span>
            <span className="block truncate text-sm font-semibold">
              hamza@gmail.com
            </span>
          </DropdownHeader>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default Header;
