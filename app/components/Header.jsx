"use client";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import { FaRegHeart, FaSun, FaMoon } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  // Custom dark mode toggle function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Toggle dark class on document
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    // Check initial dark mode state
    setDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const [topSettings, setTopSettings] = useState({
    hideDarkMode: false,
    hideFavourite: false,
    hideLogo: false,
  });

  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     try {
  //       const response = await fetch('/api/settings/general');
  //       const data = await response.json();
  //       console.log(data)
  //       if (data.settings?.logo) {
  //         console.log(data.settings.logo);
  //         setLogo(data.settings.logo);
  //       }
  //       if (data.settings?.top) {
  //         setTopSettings(data.settings.top);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch logo:', error);
  //     }
  //   };

  //   fetchSettings();
  // }, []);

  useEffect(() => {
  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings/general');
      const data = await response.json();
      
      if (data.settings?.logo) {
        // Handle base64 logos without storing the full string
        if (data.settings.logo.startsWith('data:image')) {
          // Create a blob URL for base64 images
          const byteString = atob(data.settings.logo.split(',')[1]);
          const mimeString = data.settings.logo.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          
          const blob = new Blob([ab], { type: mimeString });
          const blobUrl = URL.createObjectURL(blob);
          setLogo(blobUrl);
        } else {
          // Regular URL path
          setLogo(data.settings.logo);
        }
      }
      
      if (data.settings?.top) {
        setTopSettings(data.settings.top);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  fetchSettings();
}, []);

useEffect(() => {
  return () => {
    if (logo.startsWith('blob:')) {
      URL.revokeObjectURL(logo);
    }
  };
}, [logo]);

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

  const navigationLinks = [
    { href: "/", label: t("homeLink") },
    { href: "/car-for-sale", label: t("newAndUsedCarLink") },
    { href: "/cars/sell-my-car", label: t("carSaleLink") },
    { href: "/cars/valuation", label: t("carValuationLink") },
    { href: "/cars/leasing", label: t("carLeasingLink") },
    { href: "/cars/finance", label: t("financeCarLink") },
  ];

  return (
    <>
      {/* Clean Professional Header */}

    <div 
        className={`transition-all duration-500 ease-in-out ${
          isVisible ? 'h-16' : 'h-0'
        }`}
      />

      {/* <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      > */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Clean Background */}
        <div className="absolute inset-0 backdrop-blur-lg bg-white/15 dark:bg-gray-900/30 border-b border-white/30 dark:border-gray-700/40"></div>

        <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className="transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={logo}
                  alt="Website Logo"
                  width={60}
                  height={60}
                  className="h-16 w-24 object-contain transition-transform duration-300 hover:scale-110"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-1">
                {navigationLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="group relative px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white transition-all duration-300 hover:text-white dark:hover:text-gray-100"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute inset-0 scale-0 rounded-lg bg-white/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-100"></div>
                    <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-white/80 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Actions - Equal Size Icons */}
            <div className="flex items-center space-x-3">
              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={() => setOpenSidebar(true)}
                  className="group relative p-3 rounded-xl bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300 hover:bg-white/30 hover:scale-105 ring-1 ring-white/30 hover:ring-white/50"
                  aria-label="Account"
                >
                  <RiAccountCircleFill className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </button>

                {!topSettings.hideFavourite && (
                  <Link
                    href="/user/saved"
                    className="group relative p-3 rounded-xl bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300 hover:bg-white/30 hover:scale-105 ring-1 ring-white/30 hover:ring-white/50"
                    aria-label="Saved-ads"
                  >
                    <FaRegHeart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </Link>
                )}

                {!topSettings.hideDarkMode && (
                  <button
                    onClick={toggleDarkMode}
                    className="group relative p-3 rounded-xl bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300 hover:bg-white/30 hover:scale-105 ring-1 ring-white/30 hover:ring-white/50"
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? (
                      <FaSun className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <FaMoon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden group relative p-3 rounded-xl bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300 hover:bg-white/30 hover:scale-105 ring-1 ring-white/30 hover:ring-white/50"
                aria-label="Toggle menu"
              >
                <HiMenuAlt3 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
          <div className="border-t border-white/30 dark:border-gray-700/40 bg-white/15 dark:bg-gray-900/30 backdrop-blur-lg">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="space-y-2">
                {navigationLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white transition-all duration-300 hover:bg-white/25 hover:text-white dark:hover:text-gray-100 rounded-xl"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Actions - Equal Size Icons */}
                <div className="flex items-center justify-center space-x-4 pt-4 border-t border-white/30 dark:border-gray-700/40">
                  <button
                    onClick={() => {
                      setOpenSidebar(true);
                      setMobileMenuOpen(false);
                    }}
                    className="p-3 rounded-xl bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300 hover:bg-white/30 ring-1 ring-white/30"
                  >
                    <RiAccountCircleFill className="h-5 w-5" />
                  </button>

                  {!topSettings.hideFavourite && (
                    <Link
                      href="/user/saved"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300 hover:bg-white/30 ring-1 ring-white/30"
                    >
                      <FaRegHeart className="h-5 w-5" />
                    </Link>
                  )}

                  {!topSettings.hideDarkMode && (
                    <button
                      onClick={toggleDarkMode}
                      className="p-3 rounded-xl bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300 hover:bg-white/30 ring-1 ring-white/30 hover:scale-105"
                      aria-label="Toggle dark mode"
                    >
                      {darkMode ? (
                        <FaSun className="h-5 w-5" />
                      ) : (
                        <FaMoon className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Professional Sidebar Modal */}
      {openSidebar && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={onCloseSidebar}
        >
          <div
            className="w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl sm:w-[420px] transform transition-transform duration-300 ease-out animate-slide-in-right border-l border-white/30 dark:border-gray-700/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar Header */}
            <div className="relative border-b border-gray-200/30 dark:border-gray-700/40 bg-white/20 dark:bg-gray-800/20 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {modalType === "signIn" ? authTr("signInHeading") : authTr("registerHeading")}
                </h2>
                <button
                  onClick={onCloseSidebar}
                  className="group p-2 rounded-xl bg-white/20 backdrop-blur-sm text-gray-500 dark:text-gray-300 transition-all duration-300 hover:bg-red-500/20 hover:text-red-500 ring-1 ring-white/30 hover:ring-red-500/40"
                >
                  <IoMdClose className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </button>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="p-6 space-y-6">
              {modalType === "signIn" ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="email"
                        value={authTr("email")}
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      />
                      <TextInput
                        id="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-2 focus:ring-2 focus:ring-white/50 focus:border-transparent rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="password"
                        value={authTr("password")}
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      />
                      <TextInput
                        id="password"
                        type="password"
                        required
                        className="mt-2 focus:ring-2 focus:ring-white/50 focus:border-transparent rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-gray-600 dark:text-gray-400">
                      {authTr("rememberMe")}
                    </Label>
                  </div>

                  <Button className="w-full bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    {authTr("loginBtn")}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {authTr("notRegister")}&nbsp;
                      <button
                        onClick={() => setModalType("register")}
                        className="font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300 hover:underline"
                      >
                        {authTr("register")}
                      </button>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="name"
                        value={authTr("name")}
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      />
                      <TextInput
                        id="name"
                        placeholder="John Doe"
                        required
                        className="mt-2 focus:ring-2 focus:ring-white/50 focus:border-transparent rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        value={authTr("email")}
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      />
                      <TextInput
                        id="email"
                        placeholder="name@company.com"
                        required
                        className="mt-2 focus:ring-2 focus:ring-white/50 focus:border-transparent rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="password"
                        value={authTr("password")}
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      />
                      <TextInput
                        id="password"
                        type="password"
                        required
                        className="mt-2 focus:ring-2 focus:ring-white/50 focus:border-transparent rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50"
                      />
                    </div>
                  </div>

                  <Button className="w-full bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    {authTr("registerBtn")}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {authTr("haveAccount")}&nbsp;
                      <button
                        onClick={() => setModalType("signIn")}
                        className="font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300 hover:underline"
                      >
                        {authTr("login")}
                      </button>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;