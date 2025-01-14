import React from "react";
import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { FaPencilAlt } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import { FaList } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiChartPie, HiViewBoards } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLanguage } from "react-icons/io5";
import { MdOutlineMailLock } from "react-icons/md";
import { SiPowerpages } from "react-icons/si";

const AdminSidebar = () => {
  return (
    <Sidebar aria-label="Sidebar for the dashboard to control and manage the overall functionailty">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="/admin/dashboard" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="/admin/manage-users" icon={FaUser}>
            Manage Users
          </SidebarItem>
          <SidebarCollapse icon={FaList} label="Manage Listings">
            <SidebarItem href="/admin/listing/brand">
              Listing Brands
            </SidebarItem>
            <SidebarItem href="/admin/listing/add">Add Listings</SidebarItem>
            <SidebarItem href="/admin/listing/view">Listings</SidebarItem>
          </SidebarCollapse>
          <SidebarCollapse icon={FaPencilAlt} label="Manage Blogs">
            <SidebarItem href="/admin/categories">Categories</SidebarItem>
            <SidebarItem href="/admin/blog">Blog</SidebarItem>
            <SidebarItem href="/admin/comments/approved">
              Approved Comments
            </SidebarItem>
            <SidebarItem href="/admin/comments/pending">
              Pending Comments
            </SidebarItem>
          </SidebarCollapse>
          <SidebarCollapse icon={TiWorld} label="Manage Website">
            <SidebarItem href="/admin/manage-website/faq">FAQ</SidebarItem>
            <SidebarItem href="#">Testimonial</SidebarItem>
          </SidebarCollapse>
          <SidebarCollapse icon={IoSettingsSharp} label="Settings">
            <SidebarItem href="/admin/setting/general">
              General Settings
            </SidebarItem>
            <SidebarItem href="/admin/setting/currency">Currency</SidebarItem>
            <SidebarItem href="/admin/setting/social">Social media</SidebarItem>
          </SidebarCollapse>
          <SidebarCollapse icon={IoLanguage} label="Language">
            <SidebarItem href="#">Menu Text</SidebarItem>
            <SidebarItem href="#">Website Text</SidebarItem>
            <SidebarItem href="#">Notification Text</SidebarItem>
            <SidebarItem href="#">Admin Panel Text</SidebarItem>
          </SidebarCollapse>
          <SidebarCollapse icon={SiPowerpages} label="Page Settings">
            <SidebarItem href="/admin/setting/page/home">Home</SidebarItem>
            <SidebarItem href="/admin/setting/page/contact">
              Contact
            </SidebarItem>
            <SidebarItem href="/admin/setting/page/about">About Us</SidebarItem>
            <SidebarItem href="/admin/setting/page/terms">
              Terms & Conditions
            </SidebarItem>
            <SidebarItem href="/admin/setting/page/privacy">
              Privacy Policy
            </SidebarItem>
          </SidebarCollapse>
          <SidebarItem href="/admin/emails/view" icon={MdOutlineMailLock}>
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
