"use client";
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const page = () => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleCheckboxChange = (e) => {
    const label = e.target.nextSibling?.textContent || "";
    if (e.target.checked) {
      setSelectedFeatures((prev) => [...prev, label]);
    } else {
      setSelectedFeatures((prev) => prev.filter((item) => item !== label));
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

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <section className="my-10">
      <h2 className="text-xl font-semibold">Add Listing</h2>
      <div className="mt-5">
        <form>
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
              <Label htmlFor="brand-name">Brand Name:</Label>
              <Select id="brand-name">
                <option>Select Brand</option>
                <option value="toyota">Toyota</option>
                <option value="honda">Honda</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand-make">Brand Make:</Label>
              <Select id="brand-make">
                <option>Select Make</option>
                <option value="corolla">Corolla</option>
                <option value="civic">Civic</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand-category">Brand Category:</Label>
              <Select id="brand-category">
                <option>Select Category</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="coupe">Coupe</option>
                <option value="hybrid">Hybrid</option>
                <option value="sports">Sports</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand-model">Model:</Label>
              <Select id="brand-model">
                <option>Select Model</option>
                <option value="2002">2002</option>
                <option value="2006">2006</option>
                <option value="2012">2012</option>
                <option value="2018">2018</option>
                <option value="2024">2024</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="condition">Condition:</Label>
              <Select id="condition">
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
                <TextInput id="total-driven" type="number" />
              </div>
              <div>
                <Label htmlFor="average">Average (in Liters):</Label>
                <Select id="average">
                  <option>Select</option>
                  <option value="10-12">10-12</option>
                  <option value="15-18">15-18</option>
                  <option value="20">20</option>
                  <option value="21-23">21-23</option>
                  <option value="23-25">23-25</option>
                  <option value="25-28">25-28</option>
                  <option value="30">30</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="fuel-type">Fuel Type:</Label>
                <Select id="fuel-type">
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="cng">CNG</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="fuel-capacity">
                  Fuel Capacity (in Liters):
                </Label>
                <TextInput id="fuel-capacity" type="number" />
              </div>
              <div>
                <Label htmlFor="filling-cost">Fuel Filling Cost:</Label>
                <Select id="filling-cost">
                  <option>Select</option>
                  <option value="20">$20</option>
                  <option value="30">$30</option>
                  <option value="40">$40</option>
                  <option value="50">$50</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="gearbox">Gearbox:</Label>
                <Select id="gearbox">
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="no-of-gears">No of Gears:</Label>
                <Select id="no-of-gears">
                  <option>Select</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="no-of-doors">No of Doors:</Label>
                <Select id="no-of-doors">
                  <option>Select</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="no-of-seats">No of Seats:</Label>
                <Select id="no-of-seats">
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
                <Label htmlFor="cylinders">Cylinders (optional):</Label>
                <Select id="cylinders">
                  <option>Select</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Select>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-blue-950 dark:text-red-500">
              Vehical Features:
            </h3>
            <div className="mb-3 mt-1 border border-gray-300"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="bluetooth" onChange={handleCheckboxChange} />
                  <Label htmlFor="bluetooth">Bluetooth connectivity</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="usb-ports" onChange={handleCheckboxChange} />
                  <Label htmlFor="usb-ports">USB ports</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="carplay-androidauto"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="carplay-androidauto">
                    Apple CarPlay and Android Auto
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="wifi-hotspot" onChange={handleCheckboxChange} />
                  <Label htmlFor="wifi-hotspot">Wi-Fi hotspot</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="satellite-radio"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="satellite-radio">Satellite radio</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="navigation-system"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="navigation-system">Navigation system</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="touchscreen-display"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="touchscreen-display">
                    Touchscreen infotainment display
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="voice-recognition"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="voice-recognition">Voice recognition</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="wireless-charging"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="wireless-charging">
                    Wireless charging pad
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rear-seat-entertainment"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="rear-seat-entertainment">
                    Rear-seat entertainment system
                  </Label>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="air-conditioning"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="air-conditioning">Air conditioning</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="climate-control"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="climate-control">
                    Dual-zone or tri-zone climate control
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="heated-seats" onChange={handleCheckboxChange} />
                  <Label htmlFor="heated-seats">
                    Heated and ventilated seats
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="power-adjustable-seats"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="power-adjustable-seats">
                    Power-adjustable seats
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="leather-upholstery"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="leather-upholstery">Leather upholstery</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="keyless-entry"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="keyless-entry">
                    Keyless entry and push-button start
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="remote-start" onChange={handleCheckboxChange} />
                  <Label htmlFor="remote-start">Remote start</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="power-windows"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="power-windows">
                    Power windows and mirrors
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="sunroof" onChange={handleCheckboxChange} />
                  <Label htmlFor="sunroof">Sunroof or moonroof</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="ambient-lighting"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="ambient-lighting">
                    Ambient interior lighting
                  </Label>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="heated-steering-wheel"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="heated-steering-wheel">
                    Heated steering wheel
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="abs" onChange={handleCheckboxChange} />
                  <Label htmlFor="abs">Anti-lock Braking System (ABS)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="esc" onChange={handleCheckboxChange} />
                  <Label htmlFor="esc">
                    Electronic Stability Control (ESC)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="traction-control"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="traction-control">Traction control</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="airbags" onChange={handleCheckboxChange} />
                  <Label htmlFor="airbags">
                    Airbags (front, side, curtain)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="backup-camera"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="backup-camera">Backup camera</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="blind-spot-monitoring"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="blind-spot-monitoring">
                    Blind-spot monitoring
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="lane-keeping-assist"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="lane-keeping-assist">
                    Lane-keeping assist
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="adaptive-cruise-control"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="adaptive-cruise-control">
                    Adaptive cruise control
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="auto-braking" onChange={handleCheckboxChange} />
                  <Label htmlFor="auto-braking">
                    Automatic emergency braking
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="parking-sensors"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="parking-sensors">Parking sensors</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="tpms" onChange={handleCheckboxChange} />
                  <Label htmlFor="tpms">
                    Tire pressure monitoring system (TPMS)
                  </Label>
                </div>
              </div>
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
              <ReactQuill
                id="comment"
                modules={modules}
                formats={formats}
                className="mb-12 h-72"
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
                <TextInput id="address" type="text" />
              </div>
              <div>
                <Label htmlFor="contact">Contact No:</Label>
                <TextInput id="contact" type="tel" />
              </div>
              <div>
                <Label htmlFor="abn-no">ABN No:</Label>
                <TextInput id="abn-no" type="number" />
              </div>
            </div>
          </div>
          <div className="my-8">
            <Button
              type="submit"
              size={"md"}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Submit
            </Button>
            <div className="mt-5 text-sm text-gray-600">
              By submitting this form, you agree to the Car Dealer App's{" "}
              <Link href="#" className="text-blue-600 hover:text-blue-700">
                Terms of Service
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default page;
