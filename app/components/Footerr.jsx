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
const Footerr = () => {
  return (
    <Footer className="mt-10">
      <div className="w-full">
        <div className="grid w-full grid-cols-1 gap-8 px-6 py-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Image
              src={"/logo.png"}
              alt="Sysfoc-cars-dealer"
              priority
              width={200}
              height={100}
              className="h-auto w-auto object-cover"
            />
          </div>
          <div>
            <FooterTitle title="Quick Links" />
            <FooterLinkGroup col>
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
              <FooterLink href="#">FAQs</FooterLink>
              <FooterLink href="#">Terms & Conditions</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="Sales Department" />
            <FooterLinkGroup col>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Licensing</FooterLink>
              <FooterLink href="#">Terms &amp; Conditions</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="Trading Hour" />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  Monday
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  8:00 am - 5:00 pm
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  Tuesday
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  8:00 am - 5:00 pm
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  Wednesday
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  8:00 am - 5:00 pm
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  Thursday
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  8:00 am - 5:00 pm
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  Friday
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  8:00 am - 1:00 pm
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  Saturday
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  Closed
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  Sunday
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-white">
                  Closed
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-100 px-4 py-6 dark:bg-gray-700 sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            href="https://sysfoc.com"
            by="Dealer Website by SYSFOC Automotive"
            className="text-gray-700"
            year={2024}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon
              href="#"
              target="_blank"
              aria-labelledby="facebook icons"
              icon={FaFacebookSquare}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-labelledby="instagram icons"
              icon={FaInstagram}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-labelledby="youtube icons"
              icon={FaYoutube}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-labelledby="tiktok icons"
              icon={FaTiktok}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-labelledby="giphy icons"
              icon={SiGiphy}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-labelledby="pinterest icons"
              icon={FaPinterest}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footerr;
