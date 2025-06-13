import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { FaHeart, FaEye } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslations } from "next-intl";
import { useCurrency } from "../context/CurrencyContext"

const VehicalsList = ({ loadingState }) => {
  const t = useTranslations("HomePage");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency, selectedCurrency } = useCurrency();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/cars');
        if (!response.ok) throw new Error('Failed to fetch vehicles');
        const data = await response.json();
        console.log('API response:', data)
        console.log('All cars:', data.cars);
        const filteredCars = data.cars.filter(car =>
          car.status === 1 || car.status === "1"
        );
        console.log('Filtered cars (status=1):', filteredCars);
        setVehicles(filteredCars);
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
      <div className="mx-4 my-10 sm:mx-8 md:my-20">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-6 py-4 rounded-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">!</span>
            </div>
            <span className="font-medium">Error: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-4 my-10 sm:mx-8 md:my-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("exploreVehical")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
              Discover our premium collection of vehicles with advanced features and competitive pricing
            </p>
          </div>
          <Link href={"/car-for-sale"}>
            <div className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <span>{t("viewAll")}</span>
              <MdOutlineArrowOutward className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </Link>
        </div>
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading
          ? Array(4)
            .fill()
            .map((_, index) => (
              <div
                className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700"
                key={index}
              >
                {/* Image Skeleton */}
                <div className="relative overflow-hidden">
                  <Skeleton className="h-56 w-full" />
                </div>

                {/* Content Skeleton */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Skeleton height={24} />
                    <Skeleton height={16} width="80%" />
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-gray-700"></div>

                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="text-center space-y-2">
                        <Skeleton circle width={40} height={40} />
                        <Skeleton height={12} />
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-gray-700"></div>

                  <div className="flex items-center justify-between">
                    <Skeleton width={80} height={24} />
                    <Skeleton width={100} height={20} />
                  </div>
                </div>
              </div>
            ))
          : vehicles.map((vehicle) => (
            <div
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transform hover:-translate-y-2"
              key={vehicle._id}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={vehicle.imageUrls?.[0]}
                    fill
                    alt={`${vehicle?.makeName} ${vehicle?.modelName}`}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-red-500 transition-colors duration-200 shadow-lg">
                      <FaHeart className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-blue-500 transition-colors duration-200 shadow-lg">
                      <FaEye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Status badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-4">
                {/* Title and Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {vehicle?.makeName} {vehicle?.modelName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {vehicle?.description?.slice(0, 60)}...
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

                {/* Specifications */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center group/spec">
                    <div className="w-12 h-12 mx-auto bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center group-hover/spec:bg-blue-100 dark:group-hover/spec:bg-blue-900/50 transition-colors duration-300">
                      <IoSpeedometer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="mt-2 text-xs font-medium text-gray-900 dark:text-white">
                      {vehicle?.kms}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">KMS</p>
                  </div>

                  <div className="text-center group/spec">
                    <div className="w-12 h-12 mx-auto bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center group-hover/spec:bg-green-100 dark:group-hover/spec:bg-green-900/50 transition-colors duration-300">
                      <GiGasPump className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="mt-2 text-xs font-medium text-gray-900 dark:text-white">
                      {vehicle?.fuelType}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Fuel</p>
                  </div>

                  <div className="text-center group/spec">
                    <div className="w-12 h-12 mx-auto bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center group-hover/spec:bg-purple-100 dark:group-hover/spec:bg-purple-900/50 transition-colors duration-300">
                      <TbManualGearbox className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <p className="mt-2 text-xs font-medium text-gray-900 dark:text-white">
                      {vehicle?.gearbox}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Gear</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div className="space-y-1 flex-shrink-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
                    <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent break-words">
                      {selectedCurrency?.symbol}
                      {Math.round(
                        (vehicle?.price * (selectedCurrency?.value || 1)) /
                        (currency?.value || 1)
                      ).toLocaleString()}
                    </h4>
                  </div>

                  <Link
                    href="https://www.petbazar.com.pk/car-for-sale"
                    className="group/link flex-shrink-0"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">View Details</span>
                        <MdOutlineArrowOutward className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {/* Bottom section for additional content if needed */}
      {vehicles.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No vehicles available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Check back later for new listings or adjust your search criteria.
          </p>
        </div>
      )}
    </section>
  );
};

export default VehicalsList;