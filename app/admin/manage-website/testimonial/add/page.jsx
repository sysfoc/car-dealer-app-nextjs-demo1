"use client";
import { Button, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  return (
    <section className="my-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Add New Testimonial</h2>
        </div>
        <div>
          <Link
            href={"/admin/manage-website/testimonial"}
            className="rounded-lg bg-blue-500 p-3 text-sm text-white"
          >
            View All
          </Link>
        </div>
      </div>
      <form className="mt-5 flex flex-col gap-3">
        <div>
          <Label htmlFor="name">Name:</Label>
          <TextInput id="name" type="text" />
        </div>
        <div>
          <Label htmlFor="designation">Designation:</Label>
          <TextInput id="designation" type="text" />
        </div>
        <div>
          <Label htmlFor="content">Content:</Label>
          <Textarea id="content" rows={10} />
        </div>
        <div>
          <Label htmlFor="image">Image:</Label>
          <FileInput id="image" accept="image/*" />
        </div>
        <div>
          <Button type="submit" className="mt-3 w-full" color={"dark"}>
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Page;
