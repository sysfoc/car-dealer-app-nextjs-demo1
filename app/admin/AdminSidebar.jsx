import React from "react";
import {
  DarkThemeToggle,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
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
          <SidebarItem href="#" icon={HiInbox}>
            Inbox
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Users
          </SidebarItem>
          <SidebarItem href="#" icon={HiShoppingBag}>
            Products
          </SidebarItem>
          <SidebarItem href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="#" icon={HiTable}>
            Sign Up
          </SidebarItem>
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Upgrade to Pro
          </SidebarItem>
          <SidebarItem href="#" icon={HiViewBoards}>
            Documentation
          </SidebarItem>
          <DarkThemeToggle />
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default AdminSidebar;
