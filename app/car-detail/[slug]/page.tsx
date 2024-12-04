"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuCrown } from "react-icons/lu";
import Slider from "@/app/components/Slider";
import Table from "@/app/components/Tables";
import Features from "@/app/components/Features";
import { Button } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Car {
  id: number;
  make: string;
  model: string;
  price: number;
  type: string;
  slug: string;
}

interface ApiResponse {
  exactMatches: Car[];
  alternativeSuggestions: Car[];
}
export default function Home() {
  const { slug } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      setError(null);

      fetch(`/api/cars?slug=${slug}`)
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error("Car not found");
            }
            throw new Error("Failed to fetch car details");
          }
          return response.json();
        })
        .then((data) => {
          // setCar(data[0] || null);
          // setLoading(false);
          setCar(data.exactMatches[0] || null);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setCar(null);
          setLoading(false);
        });
    }
  }, [slug]);

  if (!slug) {
    return (
      <div className="text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center">
        <h1>Loading...</h1>
        <Skeleton height={100} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold">Error</h1>
        <p className="text-gray-500">{error}</p>
        <a href="/" className="text-blue-500 underline">
          Go back to homepage
        </a>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold">Car not found</h1>
        <p className="text-gray-500">
          The car you are looking for does not exist. Please check the slug or
          go back to the homepage.
        </p>
        <a href="/" className="text-blue-500 underline">
          Go back to homepage
        </a>
      </div>
    );
  }

  return (
    <section className="mx-4 my-5 sm:mx-8">
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-3">
        <div className="col-span-2">
          <div className="flex items-center gap-2 bg-blue-950 p-3 dark:bg-gray-700">
            <div>
              <LuCrown fontSize={25} className="text-white" />
            </div>
            <h3 className="text-lg font-bold uppercase text-white">
              Used Vehicle
            </h3>
          </div>
          <div>
            <Slider />
          </div>
          <div className="my-5">
            <h3 className="text-2xl font-semibold">{car.model}</h3>
            <h4 className="my-2 text-3xl font-semibold text-blue-950 dark:text-red-500">
              ${car.price}
            </h4>
          </div>
          <div>
            <Button
              size={"lg"}
              className="bg-blue-950 text-white dark:bg-gray-700"
            >
              Enquire Now
            </Button>
          </div>
          <div className="mt-3 border-b-2 border-blue-950 dark:border-gray-700"></div>
          <div>
            <Features />
          </div>
        </div>
        <div>
          <Table />
        </div>
      </div>
      <div className="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.9997072499596!2d73.1154986739374!3d30.663348788985527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b76da7fde6c7%3A0x53937ae1a82170a!2sKhan%20bakers!5e1!3m2!1sen!2s!4v1731403934717!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: 0, width: "100%" }}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
