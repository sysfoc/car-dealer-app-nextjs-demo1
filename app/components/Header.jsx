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
  const [bannerHeight, setBannerHeight] = useState(0);

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

  // Dynamic banner height detection
  useEffect(() => {
    const detectBannerHeight = () => {
      const banner = document.querySelector('[data-banner="top-banner"]') || 
                    document.querySelector('.top-banner') ||
                    document.querySelector('[class*="banner"]') ||
                    document.querySelector('[id*="banner"]');
      
      if (banner) {
        const height = banner.getBoundingClientRect().height;
        setBannerHeight(height);
      } else {
        setBannerHeight(0);
      }
    };

    // Initial detection
    detectBannerHeight();

    // Create a MutationObserver to watch for banner changes
    const observer = new MutationObserver(detectBannerHeight);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    // Also listen for resize events
    window.addEventListener('resize', detectBannerHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', detectBannerHeight);
    };
  }, []);

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
      {/* Dynamic spacer that adjusts based on banner presence */}
      <div 
        className={`transition-all duration-500 ease-in-out`}
        style={{ 
          height: isVisible ? `${bannerHeight + 64}px` : `${bannerHeight + 16}px` 
        }}
      />
  
      <header
        className={`fixed inset-x-0 z-40 transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ 
          top: `${bannerHeight}px` 
        }}
      >
        <div className="absolute inset-0 backdrop-blur-lg bg-white/85 dark:bg-gray-900/85 border-b border-gray-200/50 dark:border-gray-700/50"></div>

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
                    className="group relative px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 transition-all duration-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute inset-0 scale-0 rounded-lg bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm transition-transform duration-300 group-hover:scale-100"></div>
                    <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gray-800 dark:bg-gray-200 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
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
                  className="group relative p-3 rounded-xl bg-gray-100/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 hover:text-gray-900 dark:hover:text-white hover:scale-105 ring-1 ring-gray-300/50 dark:ring-gray-600/50 hover:ring-gray-400/70 dark:hover:ring-gray-500/70"
                  aria-label="Account"
                >
                  <RiAccountCircleFill className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </button>

                {!topSettings.hideFavourite && (
                  <Link
                    href="/liked-cars"
                    className="group relative p-3 rounded-xl bg-gray-100/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 hover:text-gray-900 dark:hover:text-white hover:scale-105 ring-1 ring-gray-300/50 dark:ring-gray-600/50 hover:ring-gray-400/70 dark:hover:ring-gray-500/70"
                    aria-label="Saved-ads"
                  >
                    <FaRegHeart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </Link>
                )}

                {!topSettings.hideDarkMode && (
                  <button
                    onClick={toggleDarkMode}
                    className="group relative p-3 rounded-xl bg-gray-100/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 hover:text-gray-900 dark:hover:text-white hover:scale-105 ring-1 ring-gray-300/50 dark:ring-gray-600/50 hover:ring-gray-400/70 dark:hover:ring-gray-500/70"
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
                className="lg:hidden group relative p-3 rounded-xl bg-gray-100/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 hover:text-gray-900 dark:hover:text-white hover:scale-105 ring-1 ring-gray-300/50 dark:ring-gray-600/50 hover:ring-gray-400/70 dark:hover:ring-gray-500/70"
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
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-white/85 dark:bg-gray-900/85 backdrop-blur-lg">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="space-y-2">
                {navigationLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 hover:text-gray-900 dark:hover:text-white rounded-xl"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <button
                    onClick={() => {
                      setOpenSidebar(true);
                      setMobileMenuOpen(false);
                    }}
                    className="p-3 rounded-xl bg-gray-100/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 hover:text-gray-900 dark:hover:text-white ring-1 ring-gray-300/50 dark:ring-gray-600/50"
                  >
                    <RiAccountCircleFill className="h-5 w-5" />
                  </button>

                  {!topSettings.hideFavourite && (
                    <Link
                      href="/liked-cars"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-gray-100/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 hover:text-gray-900 dark:hover:text-white ring-1 ring-gray-300/50 dark:ring-gray-600/50"
                    >
                      <FaRegHeart className="h-5 w-5" />
                    </Link>
                  )}

                  {!topSettings.hideDarkMode && (
                    <button
                      onClick={toggleDarkMode}
                      className="p-3 rounded-xl bg-gray-100/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 hover:text-gray-900 dark:hover:text-white hover:scale-105 ring-1 ring-gray-300/50 dark:ring-gray-600/50"
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
            className="w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl sm:w-[420px] transform transition-transform duration-300 ease-out animate-slide-in-right border-l border-gray-200/50 dark:border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar Header */}
            <div className="relative border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {modalType === "signIn" ? authTr("signInHeading") : authTr("registerHeading")}
                </h2>
                <button
                  onClick={onCloseSidebar}
                  className="group p-2 rounded-xl bg-gray-100/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-500 dark:text-gray-400 transition-all duration-300 hover:bg-red-100/80 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 ring-1 ring-gray-300/50 dark:ring-gray-600/50 hover:ring-red-300/50 dark:hover:ring-red-600/50"
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
                        className="mt-2 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent rounded-xl bg-gray-50/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/70"
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
                        className="mt-2 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent rounded-xl bg-gray-50/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/70"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-gray-600 dark:text-gray-400">
                      {authTr("rememberMe")}
                    </Label>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    {authTr("loginBtn")}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {authTr("notRegister")}&nbsp;
                      <button
                        onClick={() => setModalType("register")}
                        className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 hover:underline"
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
                        className="mt-2 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent rounded-xl bg-gray-50/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/70"
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
                        className="mt-2 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent rounded-xl bg-gray-50/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/70"
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
                        className="mt-2 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent rounded-xl bg-gray-50/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/70"
                      />
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    {authTr("registerBtn")}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {authTr("haveAccount")}&nbsp;
                      <button
                        onClick={() => setModalType("signIn")}
                        className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 hover:underline"
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