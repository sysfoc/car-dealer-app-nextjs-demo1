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
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
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
                <span className="text-sm font-semibold text-gray-500">
                  Monday
                </span>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-500">
                  8:00 am - 5:00 pm
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-semibold text-gray-500">
                  Tuesday
                </span>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-500">
                  8:00 am - 5:00 pm
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-semibold text-gray-500">
                  Wednesday
                </span>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-500">
                  8:00 am - 5:00 pm
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-semibold text-gray-500">
                  Thursday
                </span>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-500">
                  8:00 am - 5:00 pm
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-semibold text-gray-500">
                  Friday
                </span>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-500">
                  8:00 am - 1:00 pm
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-semibold text-gray-500">
                  Saturday
                </span>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-500">Closed</span>
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
              icon={BsFacebook}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-labelledby="instagram icons"
              icon={BsInstagram}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-labelledby="twitter icons"
              icon={BsTwitter}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-labelledby="github icons"
              icon={BsGithub}
            />
            <FooterIcon
              href="#"
              target="_blank"
              aria-labelledby="dribble icons"
              icon={BsDribbble}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footerr;
