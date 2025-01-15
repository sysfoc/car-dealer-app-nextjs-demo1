"use client";
import { Button, Label, Select, TextInput } from "flowbite-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";

const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Page = () => {
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: 500,
  };

  return (
    <section className="my-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Add New FAQ</h2>
        </div>
        <div>
          <Link
            href={"/admin/manage-website/faq"}
            className="rounded-lg bg-blue-500 p-3 text-sm text-white"
          >
            View All
          </Link>
        </div>
      </div>
      <form className="mt-5 flex flex-col gap-3">
        <div>
          <Label htmlFor="title">Title:</Label>
          <TextInput id="title" type="text" />
        </div>
        <div>
          <p className="text-sm">Content:</p>
          <Suspense fallback={<p>Loading editor...</p>}>
            <LazyJoditEditor
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={() => {}}
            />
          </Suspense>
        </div>
        <div>
          <Label htmlFor="order">Order:</Label>
          <Select id="order">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
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
