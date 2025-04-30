"use client";

import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";

const CarEditPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    price: "",
    type: "",
    kms: "",
    fuelType: "",
    fuelTankFillPrice: "",
    fuelCapacityPerTank: "",
    gearbox: "",
    condition: "",
    location: "",
    year: "",
    mileage: "",
    bodyType: "",
    color: "",
    driveType: "",
    doors: "",
    seats: "",
    noOfGears: "",
    cylinder: "",
    batteryRange: "",
    chargingTime: "",
    engineSize: "",
    enginePower: "",
    fuelConsumption: "",
    co2Emission: "",
    features: [],
    vehicleFullName: "",
    sellerComments: "",
    images: [],
    video: "",
    isFinance: "",
    slug: "",
  });

  
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await fetch(`/api/cars/${id}`, { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched Car Data:", data.car);

          // Populate formData with fetched data
          setFormData({
            ...data.car,
            slug: data.car.make.toLowerCase().replace(/\s+/g, "-"),
          });

          setCar(data.car);
        } else {
          console.error("Failed to fetch car details");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (e) => {
    const feature = e.target.value;
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch(`/api/cars/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log("Car updated successfully:", data);
  //       alert("Car updated successfully!");
  //       router.push("/admin/listing/view");
  //     } else {
  //       console.error("Failed to update car");
  //       alert("Failed to update car. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating car:", error);
  //     alert("An error occurred while updating the car.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append all form fields to FormData, excluding _id
    for (const key in formData) {
      if (key === "_id") continue; // Skip the _id field
      if (key === "images" && formData.images && formData.images.length > 0) {
        // Only append images if valid files are selected
        formData.images.forEach((image, index) => {
          if (image instanceof File) {
            formDataToSend.append("images", image); // Append each image file
          }
        });
      } else if (key === "video" && formData.video) {
        // Only append video if a file is selected
        formDataToSend.append("video", formData.video);
      } else if (key === "features") {
        // Convert features array to JSON string
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]); // Append other fields
      }
    }

    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "PATCH",
        body: formDataToSend, // Use FormData
        // Do NOT set Content-Type header manually
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Car updated successfully:", data);
        alert("Car updated successfully!");
        router.push("/admin/listing/view");
      } else {
        const errorData = await res.json();
        console.error("Failed to update car:", errorData);
        alert(`Failed to update car: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating car:", error);
      alert("An error occurred while updating the car.");
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <section className="my-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Car Listing</h2>
        <Link
          href={"/admin/listing/view"}
          className="rounded-lg bg-blue-500 p-3 text-sm text-white"
        >
          View All
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Dropdowns */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <Label htmlFor="make">Make:</Label>
            <Select
              id="make"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
            >
              <option>Select Make</option>
              <option value="Alfa Romeo">Alfa Romeo </option>
              <option value="Toyota">Toyota</option>
              <option value="BMW">BMW</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="model">Model:</Label>
            <Select
              id="model"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
            >
              <option>Select Model</option>
              <option value="159">159</option>
              <option value="Corolla">Corolla</option>
              <option value="X5">X5</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Price:</Label>
            <TextInput
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="type">Vehicle Type:</Label>
            <Select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option>Select Type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Convertible">Convertible</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="fuelType">Fuel Type:</Label>
            <Select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
            >
              <option>Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="kms">Kilometers:</Label>
            <TextInput
              id="kms"
              name="kms"
              value={formData.kms}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="gearbox">Gearbox:</Label>
            <Select
              id="gearbox"
              name="gearbox"
              value={formData.gearbox}
              onChange={handleInputChange}
            >
              <option>Select Gearbox</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="condition">Condition:</Label>
            <Select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
            >
              <option>Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="year">Year:</Label>
            <Select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
            >
              <option>Select Year</option>
              {[...Array(20)].map((_, i) => (
                <option key={i} value={2025 - i}>
                  {2025 - i}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Text Inputs */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <Label htmlFor="fuelTankFillPrice">Fuel Tank Fill Price:</Label>
            <TextInput
              id="fuelTankFillPrice"
              name="fuelTankFillPrice"
              value={formData.fuelTankFillPrice}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="fuelCapacityPerTank">Fuel Capacity Per Tank:</Label>
            <TextInput
              id="fuelCapacityPerTank"
              name="fuelCapacityPerTank"
              value={formData.fuelCapacityPerTank}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="noOfGears">Number of Gears:</Label>
            <TextInput
              id="noOfGears"
              name="noOfGears"
              value={formData.noOfGears}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="cylinder">Cylinder:</Label>
            <TextInput
              id="cylinder"
              name="cylinder"
              value={formData.cylinder}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="batteryRange">Battery Range:</Label>
            <TextInput
              id="batteryRange"
              name="batteryRange"
              value={formData.batteryRange}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="chargingTime">Charging Time:</Label>
            <TextInput
              id="chargingTime"
              name="chargingTime"
              value={formData.chargingTime}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="engineSize">Engine Size:</Label>
            <TextInput
              id="engineSize"
              name="engineSize"
              value={formData.engineSize}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="enginePower">Engine Power:</Label>
            <TextInput
              id="enginePower"
              name="enginePower"
              value={formData.enginePower}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="fuelConsumption">Fuel Consumption:</Label>
            <TextInput
              id="fuelConsumption"
              name="fuelConsumption"
              value={formData.fuelConsumption}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="co2Emission">CO2 Emission:</Label>
            <TextInput
              id="co2Emission"
              name="co2Emission"
              value={formData.co2Emission}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="vehicleFullName">Vehicle Full Name:</Label>
            <TextInput
              id="vehicleFullName"
              name="vehicleFullName"
              value={formData.vehicleFullName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="sellerComments">Seller Comments:</Label>
            <Textarea
              id="sellerComments"
              name="sellerComments"
              value={formData.sellerComments}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="location">Location:</Label>
            <TextInput
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="mileage">Mileage:</Label>
            <TextInput
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="bodyType">Body Type:</Label>
            <TextInput
              id="bodyType"
              name="bodyType"
              value={formData.bodyType}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="color">Color:</Label>
            <TextInput
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="driveType">Drive Type:</Label>
            <TextInput
              id="driveType"
              name="driveType"
              value={formData.driveType}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="doors">Doors:</Label>
            <TextInput
              id="doors"
              name="doors"
              value={formData.doors}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="seats">Seats:</Label>
            <TextInput
              id="seats"
              name="seats"
              value={formData.seats}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="isFinance">Finance:</Label>
            <TextInput
              id="isFinance"
              name="isFinance"
              value={formData.isFinance}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Features (Checkboxes) */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold">Features:</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {["Air Conditioning", "Bluetooth", "Backup Camera", "Sunroof"].map(
              (feature) => (
                <div key={feature} className="flex items-center">
                  <Checkbox
                    id={feature}
                    value={feature}
                    checked={formData.features.includes(feature)}
                    onChange={handleFeatureChange}
                  />
                  <Label htmlFor={feature} className="ml-2">
                    {feature}
                  </Label>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="mt-5">
          <Label>Existing Images:</Label>
          <div className="flex gap-2">
            {formData.images && formData.images.length > 0 ? (
              formData.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Car Image ${index}`}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              ))
            ) : (
              <p>No images available.</p>
            )}
          </div>
        </div>

        <div className="mt-5">
          <Label>Existing Video:</Label>
          {formData.video && (
            <video controls width="300" className="mt-2">
              <source src={formData.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="mt-5">
          <Label htmlFor="images">Upload Images:</Label>
          <FileInput
            id="images"
            name="images"
            multiple // Allow multiple files
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setFormData((prev) => ({ ...prev, images: files }));
            }}
          />
        </div>

        <div className="mt-5">
          <Label htmlFor="video">Upload Video:</Label>
          <FileInput
            id="video"
            name="video"
            onChange={(e) => {
              const file = e.target.files[0];
              setFormData((prev) => ({ ...prev, video: file }));
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-5">
          <Button type="submit">Update Car</Button>
        </div>
      </form>
    </section>
  );
};

export default CarEditPage;
