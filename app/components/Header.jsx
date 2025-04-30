"use client";
import {
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
  Checkbox,
  Label,
  TextInput,
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import { DarkThemeToggle } from "flowbite-react";
import { FaRegHeart } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Header = ({ isDarkMode }) => {
  const t = useTranslations("Header");
  const authTr = useTranslations("Authentication");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [email, setEmail] = useState("");
  const [modalType, setModalType] = useState("signIn");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [logo, setLogo] = useState("/logo.png");

  const [topSettings, setTopSettings] = useState({
    hideDarkMode: false,
    hideFavourite: false,
    hideLogo: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings/general');
        const data = await response.json();
        console.log(data)
        if (data.settings?.logo) {
          console.log(data.settings.logo);
          setLogo(data.settings.logo);
        }
        if (data.settings?.top) {
          setTopSettings(data.settings.top);
        }
      } catch (error) {
        console.error('Failed to fetch logo:', error);
      }
    };

    fetchSettings();
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  function onCloseSidebar() {
    setOpenSidebar(false);
    setEmail("");
    setModalType("signIn");
  }

  return (
    <>
      <Navbar
        fluid
        className={`sticky inset-x-0 top-0 z-50 bg-gray-50/95 shadow-md transition-transform duration-300 dark:bg-gray-700/95 ${isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <Link href="/">
          <Image
            // src={isDarkMode ? "/logo-white.png" : "/logo.png"}
            src={logo}
            alt="Sysfoc-cars-dealer"
            width={100}
            height={50}
            style={{ objectPosition: "center" }}
            className="size-auto"
          />
        </Link>
        <div className="flex items-center gap-5 md:hidden">
          <RiAccountCircleFill
            fontSize={22}
            className="cursor-pointer text-gray-700"
            onClick={() => setOpenSidebar(true)}
          />
          <DarkThemeToggle />
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink
            as={"div"}
            className="relative hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="/"
              className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              {t("homeLink")}
            </Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="relative hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="/car-for-sale"
              className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              {t("newAndUsedCarLink")}
            </Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="relative hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="/cars/sell-my-car"
              className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              {t("carSaleLink")}
            </Link>{" "}
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="relative hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="/cars/valuation"
              className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              {t("carValuationLink")}
            </Link>{" "}
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="relative hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="/cars/leasing"
              className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              {t("carLeasingLink")}
            </Link>{" "}
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="relative hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="/cars/finance"
              className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              {t("financeCarLink")}
            </Link>{" "}
          </NavbarLink>
        </NavbarCollapse>
        <div className="hidden items-center gap-x-5 md:flex">
          <RiAccountCircleFill
            fontSize={20}
            className="cursor-pointer text-gray-600 dark:text-gray-400"
            onClick={() => setOpenSidebar(true)}
          />
          {!topSettings.hideFavourite && (
            <Link href="/user/saved" aria-label="Saved-ads">
              <FaRegHeart
                fontSize={16}
                className="text-gray-600 dark:text-gray-400"
              />
            </Link>
          )}
          {!topSettings.hideDarkMode && <DarkThemeToggle />}
        </div>
      </Navbar>
      {openSidebar && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50"
          onClick={onCloseSidebar}
        >
          <div
            className="w-full bg-white p-6 shadow-lg dark:bg-gray-800 sm:w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mb-4 text-right text-gray-500 hover:text-gray-700 dark:text-gray-300"
              onClick={onCloseSidebar}
            >
              <IoMdClose fontSize={20} />
            </button>
            <div className="space-y-6">
              {modalType === "signIn" ? (
                <>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    {authTr("signInHeading")}
                  </h3>
                  <div>
                    <Label htmlFor="email" value={`${authTr("email")}`} />
                    <TextInput
                      id="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="focus:border-blue-950 dark:focus:border-red-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" value={`${authTr("password")}`} />
                    <TextInput
                      id="password"
                      type="password"
                      required
                      className="focus:border-blue-950 dark:focus:border-red-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">{authTr("rememberMe")}</Label>
                  </div>
                  <Button className="w-full bg-blue-950 dark:bg-red-500">
                    {authTr("loginBtn")}
                  </Button>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {authTr("notRegister")}&nbsp;
                    <span
                      onClick={() => setModalType("register")}
                      className="cursor-pointer text-blue-950 hover:underline dark:text-red-500"
                    >
                      {authTr("register")}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    {authTr("registerHeading")}
                  </h3>
                  <div>
                    <Label htmlFor="name" value={`${authTr("name")}`} />
                    <TextInput
                      id="name"
                      placeholder="John Doe"
                      required
                      className="focus:border-blue-950 dark:focus:border-red-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" value={`${authTr("email")}`} />
                    <TextInput
                      id="email"
                      placeholder="name@company.com"
                      required
                      className="focus:border-blue-950 dark:focus:border-red-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" value={`${authTr("password")}`} />
                    <TextInput
                      id="password"
                      type="password"
                      required
                      className="focus:border-blue-950 dark:focus:border-red-500"
                    />
                  </div>
                  <Button className="w-full bg-blue-950 dark:bg-red-500">
                    {authTr("registerBtn")}
                  </Button>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {authTr("haveAccount")}&nbsp;
                    <span
                      onClick={() => setModalType("signIn")}
                      className="cursor-pointer text-blue-950 hover:underline dark:text-red-500"
                    >
                      {authTr("login")}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
