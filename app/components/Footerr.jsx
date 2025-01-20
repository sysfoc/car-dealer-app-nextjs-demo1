"use client";
import {
  Footer,
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import Image from "next/image";
import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { SiGiphy } from "react-icons/si";
import { FaPinterest } from "react-icons/fa";
import LanguageSwitching from "@/app/components/LanguageSwitching";
import { useTranslations } from "next-intl";
const Footerr = ({ isDarkMode }) => {
  const t = useTranslations("Footer");
  return (
    <Footer className="mt-10 bg-gray-100/30 dark:bg-gray-700/30">
      <div className="w-full">
        <div className="grid w-full grid-cols-1 gap-8 px-6 py-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Image
              src={isDarkMode ? "/logo-white.png" : "/logo.png"}
              alt="Sysfoc-cars-dealer"
              priority
              width={200}
              height={100}
              style={{ objectPosition: "center" }}
              className="size-auto"
            />
          </div>
          <div>
            <FooterTitle title={`${t("quickLinks")}`} />
            <FooterLinkGroup col>
              <FooterLink href="/about">{t("about")}</FooterLink>
              <FooterLink href="#">{t("contact")}</FooterLink>
              <FooterLink href="/terms">{t("terms")}</FooterLink>
              <FooterLink href="/privacy">{t("privacy")}</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title={`${t("tradingHours")}`} />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("monday")}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("openingHours")}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("tuesday")}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("openingHours")}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("wednesday")}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("openingHours")}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("thursday")}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("openingHours")}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("friday")}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("openingHours")}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("saturday")}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("closedHours")}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("sunday")}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  {t("closedHours")}
                </span>
              </div>
            </div>
          </div>
          <div>
            <FooterTitle title={`${t("language")}`} />
            <LanguageSwitching />
          </div>
        </div>
        <div className="w-full bg-gray-100 px-4 py-6 dark:bg-gray-700 sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            href="https://sysfoc.com"
            by={`${t("copyright")}`}
            className="text-gray-700"
            year={2024}
          />
          <div className="mt-4 flex items-center space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon
              href="#"
              target="_blank"
              aria-label="facebook"
              icon={FaFacebookSquare}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-label="instagram"
              icon={FaInstagram}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-label="youtube"
              icon={FaYoutube}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-label="tiktok"
              icon={FaTiktok}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-label="giphy"
              icon={SiGiphy}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-label="pinterest"
              icon={FaPinterest}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footerr;
