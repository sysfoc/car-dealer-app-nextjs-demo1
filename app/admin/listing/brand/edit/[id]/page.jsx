"use client";
import React, { useState } from "react";
import { Label, TextInput, Button, FileInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [previewLogo, setPreviewLogo] = useState("/Luxury SUV.webp");

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Edit Brands</h2>
        </div>
        <div>
          <Link
            href={"/admin/listing/brand"}
            className="rounded-lg bg-blue-500 p-3 text-sm text-white"
          >
            View All
          </Link>
        </div>
      </div>
      <div>
        <form className="mt-5 flex flex-col gap-3">
          <div>
            <Label htmlFor="name">name:</Label>
            <TextInput id="name" placeholder="Toyota" />
          </div>
          <div>
            <Label htmlFor="slug">Slug:</Label>
            <TextInput id="slug" placeholder="toyota" />
          </div>
          <div>
            <p className="font-semibold">Existing Logo</p>
            <Image
              width={150}
              height={150}
              alt="logo"
              src={previewLogo}
              className="my-3"
            />
            <Label htmlFor="logo">Change Logo:</Label>
            <FileInput id="logo" accept="image/*" onChange={handleLogoChange} />
          </div>
          <div>
            <Button type="submit" className="mt-3 w-full" color={"dark"}>
              Update Changes
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;
