"use client";
import {
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { DarkThemeToggle } from "flowbite-react";
import { FaRegHeart } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [modalType, setModalType] = useState("signIn");

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
    setModalType("signIn");
  }
  return (
    <>
      <Navbar fluid className="shadow-md">
        <Link href="/">
          <Image
            src={"/logo.png"}
            priority
            alt="Sysfoc-cars-dealer"
            width={100}
            height={50}
            className="h-auto w-auto object-cover"
          />
        </Link>
        <div className="flex items-center gap-5 md:hidden">
          <RiAccountCircleFill
            fontSize={22}
            className="text-gray-700 cursor-pointer"
            onClick={() => setOpenModal(true)}
          />
          <DarkThemeToggle />
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink
            as={"div"}
            active
            className="bg-blue-950 text-white dark:text-white md:bg-transparent md:text-blue-950"
          >
            <Link href="/">Home</Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link href="/car-for-sale">New & Used Cars</Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="/sell-or-trade"
            >
              Sell or Trade
            </Link>{" "}
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="#"
            >
              Value Your Car
            </Link>{" "}
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="#"
            >
              Car Leasing
            </Link>{" "}
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="#"
            >
              Car Finance
            </Link>{" "}
          </NavbarLink>
        </NavbarCollapse>
        <div className="hidden items-center gap-x-5 md:flex">
          <RiAccountCircleFill
            fontSize={20}
            className="text-gray-600 dark:text-gray-400 cursor-pointer"
            onClick={() => setOpenModal(true)}
          />
          <FaRegHeart fontSize={16} className="text-gray-600 dark:text-gray-400" />
          <DarkThemeToggle />
        </div>
      </Navbar>
      {openModal && (
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <ModalHeader />
          <ModalBody>
            <div className="space-y-6">
              {modalType === "signIn" ? (
                <>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Sign in to Autocar Dealers
                  </h3>
                  <div>
                    <Label htmlFor="email" value="Your email" />
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
                    <Label htmlFor="password" value="Your password" />
                    <TextInput
                      id="password"
                      type="password"
                      required
                      className="focus:border-blue-950 dark:focus:border-red-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
                  <Button className="w-full bg-blue-950 dark:bg-red-500">
                    Log in to your account
                  </Button>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    Not registered?&nbsp;
                    <span
                      onClick={() => setModalType("register")}
                      className="cursor-pointer text-blue-950 hover:underline dark:text-red-500"
                    >
                      Create account
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Register for Autocar Dealers
                  </h3>
                  <div>
                    <Label htmlFor="name" value="Your name" />
                    <TextInput
                      id="name"
                      placeholder="John Doe"
                      required
                      className="focus:border-blue-950 dark:focus:border-red-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" value="Your email" />
                    <TextInput
                      id="email"
                      placeholder="name@company.com"
                      required
                      className="focus:border-blue-950 dark:focus:border-red-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" value="Your password" />
                    <TextInput
                      id="password"
                      type="password"
                      required
                      className="focus:border-blue-950 dark:focus:border-red-500"
                    />
                  </div>
                  <Button className="w-full bg-blue-950 dark:bg-red-500">
                    Create your account
                  </Button>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    Already have an account?&nbsp;
                    <span
                      onClick={() => setModalType("signIn")}
                      className="cursor-pointer text-blue-950 hover:underline dark:text-red-500"
                    >
                      Sign in
                    </span>
                  </div>
                </>
              )}
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default Header;
