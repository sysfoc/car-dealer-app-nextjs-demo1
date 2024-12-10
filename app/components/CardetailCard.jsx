"use client";
import {
  Alert,
  Button,
  Carousel,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GrSort } from "react-icons/gr";
import { FiGrid, FiList } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoSpeedometer } from "react-icons/io5";
import { GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { GiCarDoor } from "react-icons/gi";
import { GiCarSeat } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa6";
import { IoIosColorPalette } from "react-icons/io";

const CardetailCard = () => {
  const [isGridView, setIsGridView] = useState(true);
  const loading = false;
  const [openModal, setOpenModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [favorites, setFavorites] = useState(Array(4).fill(false));

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const handleFavoriteToggle = (index) => {
    setFavorites((prev) => prev.map((fav, i) => (i === index ? !fav : fav)));
  };
  const vehicalImages = [
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
  ];

  return (
    <>
      {showAlert && (
        <Alert color={"success"} className="fixed right-5 top-5 z-10 w-fit">
          Ad added to the Favourites, Successfully!!
        </Alert>
      )}
      <div className="mb-2 flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700">
        <div>
          <span className="text-sm">
            <strong>4</strong> out of <strong>500</strong> results
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <Select icon={GrSort}>
            <option value="recent">Updated Date: Recent First</option>
            <option value="oldest">Updated Date: Oldest First</option>
            <option value="price-lh">Price: Low to High</option>
            <option value="price-hl">Price: High to Low</option>
            <option value="model-latest">Model Year: Latest First</option>
            <option value="model-oldest">Model Year: Oldest First</option>
            <option value="mileage-lh">Mileage: Low to Hight</option>
            <option value="mileage-hl">Mileage: High to Low</option>
          </Select>
          <Button color={"light"} onClick={() => setIsGridView(!isGridView)}>
            {isGridView ? <FiList fontSize={20} /> : <FiGrid fontSize={20} />}
          </Button>
        </div>
      </div>

      <div
        className={`${
          isGridView
            ? "grid grid-cols-1 gap-5 md:grid-cols-2 "
            : "grid grid-cols-1 space-y-5"
        }`}
      >
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="relative rounded-lg shadow-lg dark:bg-gray-700"
          >
            <div className="mt-3 h-48 sm:h-64">
              <Carousel slideInterval={3000}>
                {vehicalImages.map((image, i) => {
                  return loading ? (
                    <Skeleton key={i} width={500} height={300} />
                  ) : (
                    <Image
                      key={i}
                      src={image.name}
                      alt={image.alt}
                      width={300}
                      height={200}
                    />
                  );
                })}
              </Carousel>
            </div>
            <div className="absolute left-2 top-2 flex items-center gap-x-2">
              <span className="rounded bg-blue-950 px-3 py-1 text-xs uppercase text-white dark:bg-red-500">
                New
              </span>
              <span className="rounded bg-blue-950 px-3 py-1 text-xs uppercase text-white dark:bg-red-500">
                Finance Available
              </span>
            </div>
            <div className="p-4">
              <div>
                <Link
                  href="/car-detail/1"
                  className="hover:text-blue-950 hover:underline dark:hover:text-red-500"
                >
                  <h3 className="font-bold uppercase">
                    {loading ? (
                      <Skeleton height={25} />
                    ) : (
                      "1996 Mercury Cougar XR7"
                    )}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold text-blue-950 dark:text-red-500">
                    {loading ? <Skeleton height={25} width={100} /> : "$3,500"}
                  </h4>
                  <div>
                    <Button
                      color={"white"}
                      onClick={() => handleFavoriteToggle(index)}
                    >
                      {favorites[index] ? (
                        <FaHeart fontSize={22} color="red" />
                      ) : (
                        <CiHeart
                          fontSize={22}
                          color="gray"
                          onClick={handleShowAlert}
                        />
                      )}
                    </Button>
                  </div>
                </div>
                <div
                  className="mt-2 border-gray-300"
                  style={{ borderWidth: "1px" }}
                ></div>
                <div className="my-3 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <FaLocationCrosshairs fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">Multan</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <FaCalendarCheck fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">2009</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <IoSpeedometer fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">200 Miles</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <GiGasPump fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">Petrol</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <TbManualGearbox fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">Manual</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <IoIosColorPalette fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">Blue</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <GiCarSeat fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">5 Seats</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <GiCarDoor fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">4 Doors</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-x-3">
                <Button
                  color={"white"}
                  className="border border-blue-950 text-sm uppercase hover:bg-blue-950 hover:text-white dark:border-red-500 dark:hover:bg-red-500"
                  onClick={() => setOpenModal(true)}
                >
                  Enquire Now
                </Button>
                <Link href={"#"} className="flex flex-col">
                  <Button
                    color={"white"}
                    className="bg-blue-950 text-sm uppercase text-white dark:bg-red-500"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <ModalHeader>Enquire Now</ModalHeader>
          <ModalBody>
            <div>
              <form>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-y-1">
                    <Label htmlFor="fname">First Name</Label>
                    <TextInput
                      type="text"
                      id="fname"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <Label htmlFor="lname">Last Name</Label>
                    <TextInput type="text" id="lname" placeholder="Last Name" />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <Label htmlFor="email">Email</Label>
                    <TextInput
                      type="email"
                      id="email"
                      placeholder="Active Email Address"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <Label htmlFor="phone">Phone</Label>
                    <TextInput
                      type="tel"
                      id="phone"
                      placeholder="+92 333 333333"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <Label htmlFor="comment">Comment</Label>
                    <Textarea rows={5} placeholder="Comment"></Textarea>
                  </div>
                </div>
                <div className="mt-5 flex flex-col">
                  <Button
                    color={"dark"}
                    className="w-full text-lg font-semibold uppercase"
                  >
                    Send Enquiry
                  </Button>
                </div>
              </form>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default CardetailCard;
