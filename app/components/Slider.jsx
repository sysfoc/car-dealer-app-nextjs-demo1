import React from "react";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Slider = ({ loadingState }) => {
  const loading = loadingState;
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
    <div className="mt-3 h-56 sm:h-72 xl:h-80 2xl:h-96">
      <Carousel slideInterval={3000}>
        {vehicalImages.map((image, index) => {
          return loading ? (
            <Skeleton key={index} width={1000} height={500} />
          ) : (
            <Image
              key={index}
              src={image.name}
              alt={image.alt}
              style={{ objectPosition: "center" }}
              width={700}
              height={500}
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slider;
