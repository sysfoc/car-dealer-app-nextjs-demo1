"use client";
import React, { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { Button, Label, TextInput } from "flowbite-react";

const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function Page() {
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: 500,
  };

  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold">Edit Email</h2>
      <div>
        <form className="mt-5 flex flex-col gap-y-5">
          <div>
            <Label htmlFor="name">Subject:</Label>
            <TextInput id="name" placeholder="Contact Form Title" />
          </div>
          <div>
            <Label htmlFor="content">Content:</Label>
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
          <div className="mt-5 flex flex-col">
            <Button color="dark">Update</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
