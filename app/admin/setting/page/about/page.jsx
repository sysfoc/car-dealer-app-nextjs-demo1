"use client";
import { Button, Label, TextInput } from "flowbite-react";
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
      <h2 className="text-2xl font-semibold">About Us</h2>
      <form className="mt-5 flex flex-col gap-3">
        <div>
          <Label htmlFor="name">Name</Label>
          <TextInput id="name" placeholder="About us" />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
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
          <Button type="submit" className="mt-3 w-full" color={"dark"}>
            Save Updates
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Page;
