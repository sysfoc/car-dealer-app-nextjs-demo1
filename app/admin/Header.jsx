"use client";
import React from "react";
import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  DropdownHeader,
  Navbar,
  NavbarBrand,
} from "flowbite-react";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";

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
          priority
          alt="Sysfoc-cars-dealer"
          width={80}
          height={50}
          style={{ objectPosition: "center" }}
          className="size-auto"
        />
      </NavbarBrand>
      <div className="flex items-center gap-x-5 md:order-2">
        <Button color={"gray"} href="/">
          <FiLogOut fontSize={20} className="text-gray-500" />
        </Button>
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
