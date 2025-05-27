"use client";

import {
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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GrSort } from "react-icons/gr";
import { FiGrid, FiList } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { FaLocationCrosshairs, FaCalendarCheck } from "react-icons/fa6";
import { IoSpeedometer } from "react-icons/io5";
import { GiGasPump, GiCarDoor, GiCarSeat } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { IoIosColorPalette } from "react-icons/io";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useCurrency } from "../context/CurrencyContext.tsx";

const CardetailCard = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [keyword] = useQueryState("keyword", "");
  const [condition] = useQueryState("condition", []);
  const [location] = useQueryState("location", []);
  const [price] = useQueryState("price", []);
  const [minYear] = useQueryState("minYear", []);
  const [maxYear] = useQueryState("maxYear", []);
  const [model] = useQueryState("model", []);
  const [millageFrom] = useQueryState("millageFrom", "");
  const [millageTo] = useQueryState("millageTo", "");
  const [gearBox] = useQueryState("gearBox", []);
  const [bodyType] = useQueryState("bodyType", []);
  const safebodyType = Array.isArray(bodyType) ? bodyType : [];
  const [color, setColor] = useQueryState("color", []);
  const safeColor = Array.isArray(color) ? color : [];
  const [doors, setDoors] = useQueryState("doors", []);
  const [seats, setSeats] = useQueryState("seats", []);
  const [fuel, setFuel] = useQueryState("fuel", []);
  const [engineSizeFrom] = useQueryState("engineSizeFrom", "");
  const [engineSizeTo] = useQueryState("engineSizeTo", "");
  const [enginePowerFrom] = useQueryState("enginePowerFrom", "");
  const [enginePowerTo] = useQueryState("enginePowerTo", "");
  const { currency, selectedCurrency } = useCurrency();

  const safeDoors = Array.isArray(doors)
    ? doors.map((door) => parseInt(door, 10)).filter(Number.isInteger)
    : [];

  const safeSeats = Array.isArray(seats)
    ? seats.map((seat) => parseInt(seat, 10)).filter(Number.isInteger)
    : [];
  const safeFuel = Array.isArray(fuel) ? fuel : [];

  const [battery, setBattery] = useQueryState("battery", "Any");
  const [charging, setCharging] = useQueryState("charging", "Any");
  const [fuelConsumption, setFuelConsumption] = useQueryState(
    "fuelConsumption",
    "Any",
  );
  const [co2Emission, setco2Emission] = useQueryState("co2Emission", "Any");
  const [driveType, setDrivetype] = useQueryState("driveType", []);
  const safedriveType = Array.isArray(driveType) ? driveType : [];

  const t = useTranslations("Filters");
  const [isGridView, setIsGridView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams({
      keyword, condition, location, price, minYear, maxYear, model, millageFrom, millageTo, gearBox, bodyType, color,
      doors, seats, fuel, battery, charging, engineSizeFrom, engineSizeTo, enginePowerFrom, enginePowerTo,
      fuelConsumption, co2Emission, driveType,
    }).toString();

    // paste below line in .env
    // NEXT_PUBLIC_API_URL=http://localhost:3000/api/
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
    console.log("API URL:", `${apiUrl}/cars?${query}`);

    setLoading(true);
    fetch(`${apiUrl}/cars?${query}`)
      .then((res) => {
        if (!res.ok) {
          console.error(`API error: ${res.status} ${res.statusText}`);
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Data:", data);
        setCars(data.cars || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setCars([]);
        setLoading(false);
      });
  }, [
    keyword, condition, location, price, minYear, maxYear, model, millageFrom, millageTo, gearBox, bodyType, color, doors, seats,
    fuel, charging, battery, engineSizeFrom, engineSizeTo, enginePowerFrom, enginePowerTo, fuelConsumption,
    co2Emission, driveType,
  ]);

  const safeCondition = Array.isArray(condition) ? condition : [];
  const safeLocation = Array.isArray(location) ? location : [];
  const safeModel =
    Array.isArray(model) && model.length > 0 ? model : model ? [model] : [];
  const safePrice = Array.isArray(price)
    ? price.map((p) => parseInt(p, 10))
    : [parseInt(price, 10)].filter(Boolean);
  const safeGearBox = Array.isArray(gearBox) ? gearBox : [];

  useEffect(() => {
    const filtered = (cars || []).filter((car) => {
      // Match against makeName and modelName instead of directly using make/model fields
      const matchesKeyword = keyword
        ? (car.makeName?.toLowerCase().includes(keyword.toLowerCase()) ||
          car.modelName?.toLowerCase().includes(keyword.toLowerCase()))
        : true;

      const matchesCondition = safeCondition.length
        ? safeCondition.includes(car.condition?.toLowerCase())
        : true;

      const matchesLocation = safeLocation.length
        ? safeLocation.some((loc) =>
          car.location?.toLowerCase().includes(loc.toLowerCase()),
        )
        : true;

      const matchesPrice = safePrice.length
        ? safePrice.some((singlePrice) => {
          const carPrice = car.price ? parseInt(car.price, 10) : null;
          return carPrice >= singlePrice;
        })
        : true;

      // Use modelYear if year is not available
      const carYear = car.year || car.modelYear;
      const matchesYear =
        carYear &&
        (!minYear || parseInt(carYear, 10) >= parseInt(minYear, 10)) &&
        (!maxYear || parseInt(carYear, 10) <= parseInt(maxYear, 10));

      // Match using modelName or modelId
      const matchesModel = safeModel.length
        ? safeModel.some(
          (modelVal) => {
            if (car.modelName) {
              return modelVal.toLowerCase() === car.modelName.toLowerCase();
            }
            if (car.modelId) {
              return modelVal === car.modelId;
            }
            return false;
          }
        )
        : true;

      // Use kms field if mileage is not available
      const carMileageField = car.mileage || car.kms;
      const matchesMileage = carMileageField
        ? (() => {
          const carMileage = parseInt(String(carMileageField).replace(/[^\d]/g, ""), 10) || 0;
          const from = millageFrom ? parseInt(millageFrom, 10) : null;
          const to = millageTo ? parseInt(millageTo, 10) : null;
          return (!from || carMileage >= from) && (!to || carMileage <= to);
        })()
        : true;

      const matchesGearBox = safeGearBox.length
        ? safeGearBox.includes(car.gearbox?.toLowerCase())
        : true;

      const matchesbodyType = safebodyType.length
        ? safebodyType.includes(car.bodyType?.toLowerCase())
        : true;

      const matchesColor = safeColor.length
        ? safeColor.includes(car.color?.toLowerCase())
        : true;

      // Convert to number if string
      const carDoors = typeof car.doors === 'string' && car.doors !== 'Select' ?
        parseInt(car.doors, 10) : car.doors;

      const matchesDoors = safeDoors.length
        ? safeDoors.includes(carDoors)
        : true;

      // Convert to number if string  
      const carSeats = typeof car.seats === 'string' && car.seats !== 'Select' ?
        parseInt(car.seats, 10) : car.seats;

      const matchesSeats = safeSeats.length
        ? safeSeats.includes(carSeats)
        : true;

      const matchesFuelType = safeFuel.length
        ? safeFuel.includes(car.fuelType?.toLowerCase())
        : true;

      const matchesDriveType = safedriveType.length
        ? safedriveType.includes(car.driveType?.toLowerCase())
        : true;

      const matchesBatteryrange = car.batteryRange
        ? (() => {
          const batteryRange = battery ? parseInt(battery, 10) : null;
          const carBatteryRange = car.batteryRange
            ? parseInt(car.batteryRange, 10)
            : null;
          return batteryRange ? carBatteryRange >= batteryRange : true;
        })()
        : true;

      const matchesChargingTime = car.chargingTime
        ? (() => {
          const chargingTime = charging ? parseInt(charging, 10) : null;
          const carChargingTime = car.chargingTime
            ? parseInt(car.chargingTime, 10)
            : null;
          return chargingTime ? carChargingTime >= chargingTime : true;
        })()
        : true;

      const matchesEngineSize =
        (!engineSizeFrom ||
          parseInt(String(car.engineSize), 10) >= parseInt(engineSizeFrom, 10)) &&
        (!engineSizeTo ||
          parseInt(String(car.engineSize), 10) <= parseInt(engineSizeTo, 10));

      const matchesEnginePower =
        (!enginePowerFrom ||
          parseInt(String(car.enginePower), 10) >= parseInt(enginePowerFrom, 10)) &&
        (!enginePowerTo ||
          parseInt(String(car.enginePower), 10) <= parseInt(enginePowerTo, 10));

      const matchesFuelConsumption = car.fuelConsumption
        ? (() => {
          const selectedFuelConsumption = fuelConsumption
            ? parseInt(fuelConsumption, 10)
            : null;
          const carFuelConsumption = car.fuelConsumption
            ? parseInt(car.fuelConsumption, 10)
            : null;
          return selectedFuelConsumption
            ? carFuelConsumption === selectedFuelConsumption
            : true;
        })()
        : true;

      const matchesCo2Emission = car.co2Emission
        ? (() => {
          const selectedCo2Emission = co2Emission
            ? parseInt(co2Emission, 10)
            : null;
          const carCo2Emission = car.co2Emission
            ? parseInt(car.co2Emission, 10)
            : null;
          return selectedCo2Emission
            ? carCo2Emission === selectedCo2Emission
            : true;
        })()
        : true;

      return (
        matchesKeyword && matchesCondition && matchesLocation && matchesPrice && matchesYear &&
        matchesModel && matchesMileage && matchesGearBox && matchesbodyType && matchesColor && matchesDoors &&
        matchesSeats && matchesFuelType && matchesBatteryrange && matchesChargingTime && matchesEngineSize &&
        matchesEnginePower && matchesFuelConsumption && matchesCo2Emission && matchesDriveType
      );
    });

    console.log("Filtered Cars:", filtered);
    setFilteredCars(filtered);
  }, [
    keyword, condition, price, location, cars, minYear, maxYear, model, millageFrom, millageTo, gearBox, bodyType, color,
    doors, seats, fuel, charging, battery, engineSizeFrom, engineSizeTo, enginePowerFrom, enginePowerTo, fuelConsumption,
    co2Emission, driveType,
  ]);

  if (loading) {
    return <p>Loading cars...</p>;
  }

  if (!filteredCars.length) {
    return <p>No cars found.</p>;
  }

  return (
    <>
      <div className="mb-2 flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700">
        <div>
          <span className="text-sm">
            <strong>{filteredCars.length}</strong> {t("outOf")} <strong>{cars.length}</strong> {t("results")}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <Select icon={GrSort}>
            <option value="recent">{t("updatedDateRecent")}</option>
            <option value="oldest">{t("updatedDateOldest")}</option>
            <option value="price-lh">{t("priceLowToHigh")}</option>
            <option value="price-hl">{t("priceHighToLow")}</option>
            <option value="model-latest">{t("modelLatest")}</option>
            <option value="model-oldest">{t("modelOldest")}</option>
            <option value="mileage-lh">{t("mileageLowToHigh")}</option>
            <option value="mileage-hl">{t("mileageHighToLow")}</option>
          </Select>
          <Button color={"light"} onClick={() => setIsGridView(!isGridView)}>
            {isGridView ? <FiList fontSize={20} /> : <FiGrid fontSize={20} />}
          </Button>
        </div>
      </div>

      <div
        className={`grid ${isGridView ? "grid-cols-1 gap-5 md:grid-cols-2" : "space-y-5"}`}
      >
        {filteredCars.map((car, index) => (
          <div
            key={car._id}
            className={`relative rounded-lg shadow-lg dark:bg-gray-700 ${isGridView ? "" : "flex flex-col gap-x-3 md:flex-row"}`}
          >
            <div
              className={`mt-3 ${isGridView ? "h-48 sm:h-64" : "h-48 w-full md:h-64 md:w-1/2"}`}
            >
              <Carousel slideInterval={3000}>
                {Array.isArray(car.imageUrls) && car.imageUrls.length > 0 ? (
                  car.imageUrls.map((image, i) => (
                    <Image
                      key={i}
                      src={image.src || image} // Use image.src if the object has it, otherwise fallback to the string
                      alt={image.alt || `Car Image ${i}`} // Use image.alt if provided, fallback to a default
                      width={300}
                      height={200}
                      className={isGridView ? "" : "rounded-md"}
                    />
                  ))
                ) : (
                  <div>No images available</div>
                )}
              </Carousel>
            </div>

            <div className="absolute left-2 top-2 flex items-center gap-x-2">
              <span className="rounded bg-blue-950 px-3 py-1 text-xs uppercase text-white dark:bg-red-500">
                {car.condition && car.condition !== "Select" ? car.condition : car.type || "Used"}
              </span>
              {car.isFinance && car.isFinance !== "km" && (
                <span className="rounded bg-blue-950 px-3 py-1 text-xs uppercase text-white dark:bg-red-500">
                  {car.isFinance}
                </span>
              )}
            </div>

            <div className="p-4">
              <div>
                <Link
                  href={`car-detail/${car.slug}`}
                  className="hover:text-blue-950 hover:underline dark:hover:text-red-500"
                >
                  <h3 className="font-bold uppercase">
                    {loading ? (
                      <Skeleton height={25} />
                    ) : (
                      `${car.makeName || "Unknown"} - ${car.modelName || "Unknown"}`
                    )}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold text-blue-950 dark:text-red-500">
                    {loading ? (
                      <Skeleton height={25} width={100} />
                    ) : (
                      `${selectedCurrency?.symbol} ${car.price || 0}`
                    )}
                  </h4>
                  <div>
                    <Button
                      color={"white"}
                    // onClick={() => handleFavoriteToggle(index)}
                    >
                      <CiHeart fontSize={22} color="gray" />
                    </Button>
                  </div>
                </div>
                <div
                  className="mt-2 border-gray-300"
                  style={{ borderWidth: "1px" }}
                ></div>
                <div
                  className={`my-3 grid ${isGridView ? "grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-4" : "grid-cols-3 gap-x-8 gap-y-4 sm:grid-cols-4"}`}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <FaLocationCrosshairs fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">{car.location || "Not specified"}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <FaCalendarCheck fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">{car.year || car.modelYear || "Not specified"}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <IoSpeedometer fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">{car.kms || car.mileage || "Not specified"}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <GiGasPump fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">{car.fuelType || "Not specified"}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <TbManualGearbox fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">{car.gearbox || "Not specified"}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <IoIosColorPalette fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">{car.color || "Not specified"}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <GiCarSeat fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">
                      {car.seats && car.seats !== "Select" ? car.seats : "Not specified"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <GiCarDoor fontSize={22} />
                    </div>
                    <p className="mt-2 text-sm">
                      {car.doors && car.doors !== "Select" ? car.doors : "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-x-3">
                <Button
                  color={"white"}
                  className="border border-blue-950 text-sm uppercase hover:bg-blue-950 hover:text-white dark:border-red-500 dark:hover:bg-red-500"
                  onClick={() => setOpenModal(true)}
                >
                  {t("enquireNow")}
                </Button>
                <Link href={`car-detail/${car.slug}`} className="flex flex-col">
                  <Button
                    color={"white"}
                    className="bg-blue-950 text-sm uppercase text-white dark:bg-red-500"
                  >
                    {t("viewDetails")}
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
                  <div className="flex flex-col gap-y-1 sm:col-span-2">
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
