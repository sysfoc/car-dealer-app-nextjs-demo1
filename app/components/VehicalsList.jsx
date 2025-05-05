import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslations } from "next-intl";
import { useCurrency } from "../context/CurrencyContext"

const VehicalsList = ({ loadingState }) => {

  const t = useTranslations("HomePage");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency } = useCurrency();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/cars');
        if (!response.ok) throw new Error('Failed to fetch vehicles');
        const data = await response.json( );
        console.log('API response:',data)
        setVehicles(data.cars.filter(car => car.status === 1));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  if (error) {
    return (
      <div className="mx-4 my-10 sm:mx-8 md:my-20 text-red-500">
        Error: {error}
      </div>
    );
  }
  return (
    <section className="mx-4 my-10 sm:mx-8 md:my-20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold md:text-3xl">
          {t("exploreVehical")}
        </h2>
        <Link href={"/car-for-sale"}>
          <p className="inline-flex items-center gap-x-3">
            {t("viewAll")} <MdOutlineArrowOutward />
          </p>
        </Link>
      </div>
      <div className="mt-3 border-b-2 border-gray-300 dark:border-gray-700"></div>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
           ? Array(4)
             .fill()
             .map((_, index) => (
              <div
                className="overflow-hidden rounded-xl shadow-md dark:bg-gray-700"
                key={index}
              >
                <div>
                  <Skeleton className="h-[210px] w-full" />
                </div>
                <div className="my-3 px-4">
                  <h3 className="text-xl font-semibold">
                    <Skeleton />
                  </h3>
                  <p className="text-sm">
                    <Skeleton />
                  </p>
                  <div className="mt-3 border-b-2 border-gray-100"></div>
                  <div className="my-3 grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <Skeleton circle width={30} height={30} />
                      </div>
                      <p className="mt-2 text-sm">
                        <Skeleton />
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <Skeleton circle width={30} height={30} />
                      </div>
                      <p className="mt-2 text-sm">
                        <Skeleton />
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <Skeleton circle width={30} height={30} />
                      </div>
                      <p className="mt-2 text-sm">
                        <Skeleton />
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 border-b-2 border-gray-100"></div>
                  <div className="my-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">
                        <Skeleton width={70} height={20} />
                      </h4>
                    </div>
                    <div>
                      <Link
                        // href={`${vehicle.url}`}
                        href="https://www.petbazar.com.pk/car-for-sale"
                        className="font-semibold text-blue-950 dark:text-red-500"
                      >
                        <p className="inline-flex items-center gap-x-3">
                          View Details <MdOutlineArrowOutward />
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : vehicles.map((vehicle, index) => (
              <div
                className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:scale-95 dark:bg-gray-700"
                key={vehicle._id}
              >
                <div>
                  <Image
                    src={vehicle.imageUrls?.[0]}
                    width={300}
                    height={300}
                    alt="car-1"
                    style={{ objectPosition: "center" }}
                    className="size-full"
                  />
                </div>
                <div className="my-3 px-4">
                  <h3 className="text-xl font-semibold">{vehicle?.make}{" "}{vehicle?.model}</h3>
                  <p className="text-sm">
                    {vehicle?.description?.slice(0, 26)}...
                  </p>
                  <div className="mt-3 border-b-2 border-gray-100"></div>
                  <div className="my-3 grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <IoSpeedometer fontSize={25} />
                      </div>
                      <p className="mt-2 text-sm">{vehicle?.kms}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <GiGasPump fontSize={25} />
                      </div>
                      <p className="mt-2 text-sm">{vehicle?.fuelType}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <TbManualGearbox fontSize={25} />
                      </div>
                      <p className="mt-2 text-sm">{vehicle?.gearbox}</p>
                    </div>
                  </div>
                  <div className="mt-3 border-b-2 border-gray-100"></div>
                  <div className="my-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">
                        {/* {vehicle.price} */}
                        {currency?.symbol} {(vehicle?.price / (currency?.value || 1)).toFixed(2)}

                      </h4>
                    </div>
                    <div>
                      <Link
                        href="https://www.petbazar.com.pk/car-for-sale"
                        className="font-semibold text-blue-950 dark:text-red-500"
                      >
                        <p className="inline-flex items-center gap-x-3">
                          View Details <MdOutlineArrowOutward />
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default VehicalsList;
