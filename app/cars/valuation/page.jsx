"use client";

import { useState } from "react";
import BrandsList from "@/app/components/BrandsList";
import ChooseUs from "@/app/components/ChooseUs";
import { Button, Card, Label, Select } from "flowbite-react";
import { AiOutlineDollar } from "react-icons/ai";
import { MdSell } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Home() {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    valuationType: "",
  });

  const handleChange = (e) => {
    // console.log("Form data being submitted:", formData);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form data being submitted:", formData);

    try {
      const response = await fetch("/api/valuation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire("Success", "Valuation submitted successfully!", "success");
        setFormData({ make: "", model: "", valuationType: "" });
      } else {
        throw new Error("Failed to submit data");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.error(error);
    }
  };

  return (
    <>
      <section
        className="min-h-screen w-full"
        style={{
          background: "url('/sydney.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundColor: "#000000bf",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="flex min-h-screen w-full items-center justify-center px-5">
          <div className="w-full sm:w-[45%]">
            <Card>
              <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Get a free car valuation in a minute
              </h5>
              <p className="text-center font-normal text-gray-700 dark:text-gray-400">
                What kind of valuation are you doing?
              </p>
              <div className="flex flex-wrap items-center gap-x-3">
                <Button
                  color={"dark"}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      valuationType: "Selling",
                    }))
                  }
                >
                  <AiOutlineDollar className="mr-2" fontSize={20} />
                  Im Selling
                </Button>
                <Button
                  color={"dark"}
                  outline
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      valuationType: "Buying",
                    }))
                  }
                >
                  <MdSell className="mr-2" fontSize={20} />
                  Im Buying
                </Button>
                <Button
                  color={"dark"}
                  outline
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      valuationType: "Trading",
                    }))
                  }
                >
                  <FaExchangeAlt className="mr-2" fontSize={20} />
                  Im Trading in
                </Button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <Label htmlFor="make">Make</Label>
                    <Select
                      id="make"
                      value={formData.make}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Volvo">Volvo</option>
                      <option value="BMW">BMW</option>
                      <option value="Audi">Audi</option>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="model">Model</Label>
                    <Select
                      id="model"
                      value={formData.model}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="S60">S60</option>
                      <option value="X5">X5</option>
                      <option value="A4">A4</option>
                    </Select>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-center">
                  <Button size={"md"} color={"dark"} type="submit">
                    Get my valuation
                  </Button>
                </div>
                <div className="mt-8">
                  <p className="text-center">Quick. Free. No obligation.</p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
      <BrandsList />
      <ChooseUs />
    </>
  );
}
