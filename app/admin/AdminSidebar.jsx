import React from "react";
import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import { FaPencilAlt } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import { FaList } from "react-icons/fa";
import { HiChartPie, HiViewBoards } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLanguage } from "react-icons/io5";
import { MdOutlineMailLock } from "react-icons/md";
import { SiPowerpages } from "react-icons/si";
import Image from "next/image";

const AdminSidebar = () => {
  return (
    <Sidebar aria-label="Sidebar for the dashboard to control and manage the overall functionailty">
      <div className="mb-4 flex items-center justify-center">
        <Image
          src={"/logo.png"}
          alt="Sysfoc-cars-dealer"
          priority
          width={120}
          height={50}
          className="size-auto object-cover"
        />
      </div>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarCollapse icon={FaList} label="Manage Listings">
            <SidebarItem href="#">Listing Brands</SidebarItem>
            <SidebarItem href="#">Add Listings</SidebarItem>
            <SidebarItem href="#">Listings</SidebarItem>
          </SidebarCollapse>
          <SidebarCollapse icon={FaPencilAlt} label="Manage Blogs">
            <SidebarItem href="#">Categories</SidebarItem>
            <SidebarItem href="#">Blog</SidebarItem>
            <SidebarItem href="#">Approved Comments</SidebarItem>
            <SidebarItem href="#">Pending Comments</SidebarItem>
          </SidebarCollapse>
          <SidebarCollapse icon={TiWorld} label="Manage Website">
            <SidebarItem href="#">FAQ</SidebarItem>
            <SidebarItem href="#">Testimonial</SidebarItem>
            <SidebarItem href="#">Approved Comments</SidebarItem>
            <SidebarItem href="#">Pending Comments</SidebarItem>
          </SidebarCollapse>
          <SidebarCollapse icon={IoSettingsSharp} label="Settings">
            <SidebarItem href="#">General Settings</SidebarItem>
            <SidebarItem href="#">Payment Settings</SidebarItem>
            <SidebarItem href="#">Currency</SidebarItem>
            <SidebarItem href="#">Social media</SidebarItem>
          </SidebarCollapse>
          <SidebarCollapse icon={IoLanguage} label="Language">
            <SidebarItem href="#">Menu Text</SidebarItem>
            <SidebarItem href="#">Website Text</SidebarItem>
            <SidebarItem href="#">Notification Text</SidebarItem>
            <SidebarItem href="#">Admin Panel Text</SidebarItem>
          </SidebarCollapse>
          <SidebarCollapse icon={SiPowerpages} label="Page Settings">
            <SidebarItem href="#">Home</SidebarItem>
            <SidebarItem href="#">Blog</SidebarItem>
            <SidebarItem href="#">FAQs</SidebarItem>
            <SidebarItem href="#">Contact</SidebarItem>
            <SidebarItem href="#">About Us</SidebarItem>
            <SidebarItem href="#">Terms & Conditions</SidebarItem>
            <SidebarItem href="#">Privacy Policy</SidebarItem>
          </SidebarCollapse>
          <SidebarItem href="#" icon={MdOutlineMailLock}>
            Email Templates
          </SidebarItem>
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiViewBoards}>
            Documentation
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default AdminSidebar;
