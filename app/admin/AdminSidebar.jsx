"use client";
import React, { useState, useEffect } from "react";
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
import { MdLogout } from "react-icons/md";
import { SiPowerpages } from "react-icons/si";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const AdminSidebar = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.user.role);
          console.log("User Role from API:", data.user.role);
        } else {
          console.error("Failed to fetch user data");
          const token = Cookies.get("token");
          if (token) {
            const decoded = jwt.decode(token);
            setUserRole(decoded?.role);
            console.log("User Role from token fallback:", decoded?.role);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        const token = Cookies.get("token");
        if (token) {
          const decoded = jwt.decode(token);
          setUserRole(decoded?.role);
          console.log("User Role from token fallback:", decoded?.role);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
  setIsLoggingOut(true);
  try {
    const response = await fetch("/api/users/logout", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      Cookies.remove("token");
      router.replace("/login");
    } else {
      console.error("Logout failed:", await response.text());
      alert("Logout failed. Please try again.");
    }
  } catch (error) {
    console.error("Logout error:", error);
    alert("Something went wrong during logout.");
  } finally {
    setIsLoggingOut(false);
  }
};


  const sidebarItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: HiChartPie },
  ];
  console.log("Current userRole:", userRole);

  const collapsibleItems = [
    ...(userRole === "superadmin"
      ? [
          {
            label: "Manage Users",
            icon: FaUser,
            links: [
              { label: "All users", href: "/admin/manage-users" },
              { label: "Create User", href: "/admin/createUser" },
            ],
          },
        ]
      : []),
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
      links: [{ label: "Blog", href: "/admin/blog" }],
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
        { label: "Utility pages", href: "/admin/setting/page/about" },
      ],
    },
  ];

  return (
    <Sidebar aria-label="Admin dashboard navigation sidebar">
      <SidebarItems>
        <SidebarItemGroup>
          {sidebarItems.map((item) => (
            <SidebarItem key={item.href} href={item.href} icon={item.icon}>
              {item.label}
            </SidebarItem>
          ))}

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

          <SidebarItem
            onClick={handleLogout}
            icon={MdLogout}
            className="cursor-pointer"
          >
            {isLoggingOut ? "Logging Out..." : "Logout"}
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default AdminSidebar;