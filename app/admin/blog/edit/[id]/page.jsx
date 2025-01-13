"use client";
import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function Page() {
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: 500,
  };

  return (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Edit Post</h2>
        </div>
        <div>
          <Link
            href={"/admin/blog"}
            className="rounded-lg bg-blue-500 p-3 text-sm text-white"
          >
            View All
          </Link>
        </div>
      </div>
      <div>
        <div>
          <form className="mt-8 flex flex-col gap-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <TextInput id="name" placeholder="This is my first post" />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <TextInput id="slug" placeholder="This is my first post" />
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
              <Label htmlFor="image">Existed Image</Label>
              <Image
                width={150}
                height={150}
                style={{ objectPosition: "center" }}
                src={"/Luxury SUV.webp"}
                alt="image"
              />
              <TextInput
                type="file"
                id="image"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="short-content">Short Content</Label>
              <Textarea
                id="short-content"
                placeholder="This is my first post"
                style={{ height: "300px" }}
              />
            </div>
            <div>
              <Label htmlFor="category">Select Category</Label>
              <Select id="category">
                <option value="any">Select Category</option>
                <option value="$1000">Parent Blog</option>
              </Select>
            </div>
            <div>
              <Button color="dark" className="w-full">
                Update Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
