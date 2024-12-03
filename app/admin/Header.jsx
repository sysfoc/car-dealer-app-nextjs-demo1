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

const Header = () => {
  return (
    <Navbar fluid rounded className="dark:shadow-xl">
      <NavbarBrand href="/admin/dashboard">
        <Image
          src={"/logo.png"}
          alt="Sysfoc-cars-dealer"
          width={80}
          height={50}
          className="h-auto w-auto object-cover"
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
