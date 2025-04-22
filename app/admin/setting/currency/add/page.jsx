"use client";

import { Button, Label, Select, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [value, setValue] = useState("");
  const [isDefault, setIsDefault] = useState("no");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      symbol,
      value: parseFloat(value),
      isDefault: isDefault === "yes",
    };

    try {
      const res = await fetch("/api/currency", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/setting/currency"); // Redirect back to list
      } else {
        const error = await res.json();
        console.error("Failed to add currency", error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="my-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Add New Currency</h2>
        <Link
          href={"/admin/setting/currency"}
          className="rounded-lg bg-blue-500 p-3 text-sm text-white"
        >
          View All
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <div>
          <Label htmlFor="name">Name</Label>
          <TextInput
            type="text"
            id="name"
            autoComplete="on"
            placeholder="USD"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="symbol">Symbol</Label>
          <TextInput
            type="text"
            id="symbol"
            placeholder="Add Currency Symbol (Like $)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="value">Value</Label>
          <TextInput
            type="number"
            id="value"
            placeholder="1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="is-default">Is Default?</Label>
          <Select
            id="is-default"
            value={isDefault}
            onChange={(e) => setIsDefault(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </div>
        <div>
          <Button type="submit" className="mt-3 w-full" color={"dark"}>
            Add Currency
          </Button>
        </div>
      </form>
    </section>
  );
};

export default page;
