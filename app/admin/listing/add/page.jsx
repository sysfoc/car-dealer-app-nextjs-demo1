"use client";
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const featuresList = [
    { id: "bluetooth", label: "Bluetooth connectivity" },
    { id: "usb-ports", label: "USB ports" },
    { id: "carplay-androidauto", label: "Apple CarPlay and Android Auto" },
    { id: "wifi-hotspot", label: "Wi-Fi hotspot" },
    { id: "satellite-radio", label: "Satellite radio" },
    { id: "navigation-system", label: "Navigation system" },
    { id: "touchscreen-display", label: "Touchscreen infotainment display" },
    { id: "voice-recognition", label: "Voice recognition" },
    { id: "wireless-charging", label: "Wireless charging pad" },
    { id: "rear-seat-entertainment", label: "Rear-seat entertainment system" },
    { id: "air-conditioning", label: "Air conditioning" },
    { id: "climate-control", label: "Dual-zone or tri-zone climate control" },
    { id: "heated-seats", label: "Heated and ventilated seats" },
    { id: "power-adjustable-seats", label: "Power-adjustable seats" },
    { id: "leather-upholstery", label: "Leather upholstery" },
    { id: "keyless-entry", label: "Keyless entry and push-button start" },
    { id: "remote-start", label: "Remote start" },
    { id: "power-windows", label: "Power windows and mirrors" },
    { id: "sunroof", label: "Sunroof or moonroof" },
    { id: "ambient-lighting", label: "Ambient interior lighting" },
  ];

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    price: 0,
    type: "",
    kms: "",
    fuelType: "",
    fuelTankFillPrice: "",
    fuelCapacityPerTank: "",
    noOfGears: 0,
    cylinder: 0,
    features: [],
    doors: 0,
    seats: 0,
    gearbox: "",
    engineCapacity: "",
    images: {},
    video: "",
    sellerComments: "",
    condition: "",
    location: "",
    year: "",
    mileage: "",
    bodyType: "",
    color: "",
    batteryRange: 0,
    chargingTime: 0,
    engineSize: 0,
    enginePower: 0,
    fuelConsumption: 0,
    isFinance: "",
    slug: "",
    co2Emission: 0,
    driveType: "",
    dealerInfo: {
      id: "",
      name: "",
      address: "",
      contact: "",
      licence: "",
      abn: "",
      map: "",
    },
  });
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    }
  };

  const handleDealerChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dealerInfo: {
        ...prev.dealerInfo,
        [name]: value,
      },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire("Success!", result.message, "success");
        setFormData({
          make: "",
          model: "",
          price: 0,
          type: "",
          kms: "",
          fuelType: "",
          fuelTankFillPrice: "",
          fuelCapacityPerTank: "",
          noOfGears: 0,
          cylinder: 0,
          features: [],
          doors: 0,
          seats: 0,
          gearbox: "",
          engineCapacity: "",
          images: [],
          video: "",
          sellerComments: "",
          condition: "",
          location: "",
          year: "",
          mileage: "",
          bodyType: "",
          color: "",
          batteryRange: 0,
          chargingTime: 0,
          engineSize: 0,
          enginePower: 0,
          fuelConsumption: 0,
          isFinance: "",
          slug: "",
          co2Emission: 0,
          driveType: "",
          dealerInfo: {
            id: "",
            name: "",
            address: "",
            contact: "",
            licence: "",
            abn: "",
            map: "",
          },
        });
      } else {
        Swal.fire("Error!", result.message || "Something went wrong.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Server error occurred.", "error");
    }
  };

  const [media, setMedia] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newMedia = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));
    setMedia((prev) => [...prev, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    setMedia((prev) => {
      const updatedMedia = [...prev];
      updatedMedia.splice(index, 1);
      return updatedMedia;
    });
  };

  return (
    <section className="my-10">
      <h2 className="text-xl font-semibold">Add Listing</h2>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="images">Add Vehical Images Or Videos</Label>
            <FileInput
              type="file"
              multiple
              className="mt-1"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
            <div className="mb-6 mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {media.map((item, index) => (
                <div key={index} className="group relative">
                  {item.type === "image" ? (
                    <Image
                      width={250}
                      height={250}
                      src={item.preview}
                      alt={`Preview ${index + 1}`}
                      className="h-40 w-full rounded-lg border object-cover"
                    />
                  ) : (
                    <video
                      controls
                      src={item.preview}
                      className="h-40 w-full rounded-lg border object-cover"
                    />
                  )}
                  <button
                    type="button"
                    className="absolute right-2 top-2 rounded-full bg-red-600 px-3 py-2 text-white opacity-0 transition group-hover:opacity-100"
                    onClick={() => handleDeleteMedia(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-blue-950 dark:text-red-500">
              General Details:
            </h3>
            <div className="mb-3 mt-1 border border-gray-300"></div>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <Label htmlFor="brand-make">Brand Make:</Label>
              <Select
                id="brand-make"
                name="make"
                value={formData.make}
                onChange={handleChange}
              >
                <option>Select Make</option>
                <option value="corolla">Corolla</option>
                <option value="civic">Civic</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand-Model">Brand Model:</Label>
              <Select
                id="brand-Model"
                name="model"
                value={formData.model}
                onChange={handleChange}
              >
                <option>Select MOdEL</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="coupe">Coupe</option>
                <option value="hybrid">Hybrid</option>
                <option value="sports">Sports</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="total-driven">Price:</Label>
              <TextInput
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="type">Type:</Label>
              <Select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="used">Used</option>
                <option value="new">New</option>
              </Select>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h3 className="text-sm font-semibold text-blue-950 dark:text-red-500">
                Driving Details:
              </h3>
              <div className="mb-3 mt-1 border border-gray-300"></div>
            </div>
            <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <Label htmlFor="total-driven">Total Driven (in km):</Label>
                <TextInput
                  id="total-driven"
                  type="number"
                  name="kms"
                  value={formData.kms}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="fuel-type">Fuel Type:</Label>
                <Select
                  id="fuel-type"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="cng">CNG</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="fuel-capacity">fuelCapacityPerTank:</Label>
                <TextInput
                  id="fuel-capacity"
                  type="number"
                  name="fuelCapacityPerTank"
                  value={formData.fuelCapacityPerTank}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="filling-cost">fuelTankFillPrice:</Label>
                <Select
                  id="filling-cost"
                  name="fuelTankFillPrice"
                  value={formData.fuelTankFillPrice}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="20">$20</option>
                  <option value="30">$30</option>
                  <option value="40">$40</option>
                  <option value="50">$50</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="gearbox">Gearbox:</Label>
                <Select
                  id="gearbox"
                  name="gearbox"
                  value={formData.gearbox}
                  onChange={handleChange}
                >
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="noOfGears">No of Gears:</Label>
                <Select
                  id="noOfGears"
                  name="noOfGears"
                  value={formData.noOfGears}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="no-of-doors">No of Doors:</Label>
                <Select
                  id="doors"
                  name="doors"
                  value={formData.doors}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="seats">No of Seats:</Label>
                <Select
                  id="seats"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="cylinder">Cylinders (optional):</Label>
                <Select
                  id="cylinder"
                  name="cylinder"
                  value={formData.cylinder}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="condition">Condition:</Label>
                <Select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="new">New</option>
                  <option value="old">OLD</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="mileage">Millage:</Label>
                <TextInput
                  id="mileage"
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="BodyType">BodyType:</Label>
                <TextInput
                  id="BodyType"
                  type="text"
                  name="bodyType"
                  value={formData.bodyType}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="color">Color:</Label>
                <TextInput
                  id="color"
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="location">Location:</Label>
                <TextInput
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="year">Year:</Label>
                <TextInput
                  id="year"
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="batteryRange">batteryRange:</Label>
                <TextInput
                  id="batteryRange"
                  type="number"
                  name="batteryRange"
                  value={formData.batteryRange}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="chargingTime">Charging Time:</Label>
                <TextInput
                  id="chargingTime"
                  type="number"
                  name="chargingTime"
                  value={formData.chargingTime}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="engine-capacity">EngineSize:</Label>
                <TextInput
                  id="engineSize"
                  type="number"
                  name="engineSize"
                  value={formData.engineSize}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="enginePower">EnginePower:</Label>
                <TextInput
                  id="enginePower"
                  type="number"
                  name="enginePower"
                  value={formData.enginePower}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="engine-capacity">fuelConsumption:</Label>
                <TextInput
                  id="fuelConsumption"
                  type="number"
                  name="fuelConsumption"
                  value={formData.fuelConsumption}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="isFinance">isFinance:</Label>
                <TextInput
                  id="isFinance"
                  type="text"
                  name="isFinance"
                  value={formData.isFinance}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="co2Emission">Co2 Emission</Label>
                <TextInput
                  id="engine-capacity"
                  type="number"
                  name="co2Emission"
                  value={formData.co2Emission}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="driveType">driveType</Label>
                <TextInput
                  id="driveType"
                  type="number"
                  name="driveType"
                  value={formData.driveType}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-blue-950 dark:text-red-500">
              Vehicle Features:
            </h3>
            <div className="mb-3 mt-1 border border-gray-300"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {featuresList.map((feature) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <Checkbox
                    id={feature.id}
                    name={feature.id}
                    checked={formData.features[feature.id] || false}
                    onChange={handleChange}
                  />
                  <Label htmlFor={feature.id}>{feature.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-blue-950 dark:text-red-500">
              Seller Comments:
            </h3>
            <div className="mb-3 mt-1 border border-gray-300"></div>
            <div>
              <Label htmlFor="comment" className="sr-only">
                Comments:
              </Label>
              <Textarea
                id="comment"
                className="mb-12 h-72"
                name="sellerComments"
                value={formData.sellerComments}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-blue-950 dark:text-red-500">
              Contact Details
            </h3>
            <div className="mb-3 mt-1 border border-gray-300"></div>
            <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <Label htmlFor="address">Address:</Label>
                <TextInput
                  id="address"
                  type="text"
                  name="address"
                  value={formData.dealerInfo.address}
                  onChange={(e) => handleDealerChange(e)}
                />
              </div>
              <div>
                <Label htmlFor="contact">Contact No:</Label>
                <TextInput
                  id="contact"
                  type="tel"
                  name="contact"
                  value={formData.dealerInfo.contact}
                  onChange={(e) => handleDealerChange(e)}
                />
              </div>
              <div>
                <Label htmlFor="abn-no">ABN No:</Label>
                <TextInput
                  id="abn-no"
                  type="text"
                  name="abn"
                  value={formData.dealerInfo.abn}
                  onChange={(e) => handleDealerChange(e)}
                />
              </div>
              <div>
                <Label htmlFor="abn-no">Map:</Label>
                <TextInput
                  id="abn-no"
                  type="text"
                  name="map"
                  value={formData.dealerInfo.map}
                  onChange={(e) => handleDealerChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="my-8">
            <Button type="submit" size={"md"} color={"dark"} className="w-full">
              Submit
            </Button>
            <div className="mt-5 text-sm text-gray-600">
              By submitting this form, you agree to the Car Dealer App{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                Terms of Service
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;
