"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { FaPencilAlt, FaList, FaUser } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import { HiChartPie } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineMailLock, MdLogout } from "react-icons/md";
import { SiPowerpages } from "react-icons/si";

const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: HiChartPie },
  { label: "Manage Users", href: "/admin/manage-users", icon: FaUser },
];

const collapsibleItems = [
  {
    label: "Manage Listings",
    icon: FaList,
    links: [
      { label: "Listing Brands", href: "/admin/listing/brand" },
      { label: "Add Listings", href: "/admin/listing/add" },
      { label: "Listings", href: "/admin/listing/view" },
      { label: "Pending Listings", href: "/admin/listing/approved" },
    ],
  },
  {
    label: "Manage Blogs",
    icon: FaPencilAlt,
    links: [
      // { label: "Categories", href: "/admin/categories" },
      { label: "Blog", href: "/admin/blog" },
      // { label: "Approved Comments", href: "/admin/comments/approved" },
      // { label: "Pending Comments", href: "/admin/comments/pending" },
    ],
  },
  {
    label: "Manage Website",
    icon: TiWorld,
    links: [
      { label: "FAQ", href: "/admin/manage-website/faq" },
      { label: "Testimonial", href: "/admin/manage-website/testimonial" },
    ],
  },
  {
    label: "Settings",
    icon: IoSettingsSharp,
    links: [
      { label: "General Settings", href: "/admin/setting/general" },
      { label: "Default Settings", href: "/admin/setting/default" },
      { label: "Currency", href: "/admin/setting/currency" },
      { label: "Social Media", href: "/admin/setting/social" },
    ],
  },
  {
    label: "Page Settings",
    icon: SiPowerpages,
    links: [
      { label: "Home", href: "/admin/setting/page/home" },
      { label: "Contact", href: "/admin/setting/page/contact" },
      { label: "About Us", href: "/admin/setting/page/about" },
      { label: "Terms & Conditions", href: "/admin/setting/page/terms" },
      { label: "Privacy Policy", href: "/admin/setting/page/privacy" },
    ],
  },
];

const AdminSidebar = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/users/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
      } else {
        alert("Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Sidebar aria-label="Admin dashboard navigation sidebar">
      <SidebarItems>
        <SidebarItemGroup>
          {/* Static Sidebar Items */}
          {sidebarItems.map((item) => (
            <SidebarItem key={item.href} href={item.href} icon={item.icon}>
              {item.label}
            </SidebarItem>
          ))}

          {/* Collapsible Sidebar Sections */}
          {collapsibleItems.map((group) => (
            <SidebarCollapse
              key={group.label}
              icon={group.icon}
              label={group.label}
            >
              {group.links.map((link) => (
                <SidebarItem key={link.href} href={link.href}>
                  {link.label}
                </SidebarItem>
              ))}
            </SidebarCollapse>
          ))}

          {/* Static Email Template Section */}
          <SidebarItem href="/admin/emails/view" icon={MdOutlineMailLock}>
            Email Templates
          </SidebarItem>

          {/* Logout Section */}
          <SidebarItem onClick={handleLogout} icon={MdLogout}>
            {isLoggingOut ? "Logging Out..." : "Logout"}
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default AdminSidebar;
