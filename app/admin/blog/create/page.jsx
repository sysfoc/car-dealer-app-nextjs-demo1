"use client";
import {
  Button,
  FileInput,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
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
          <h2 className="text-2xl font-bold">Add New Post</h2>
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
      <form className="mt-5 flex flex-col gap-3">
        <div>
          <Label htmlFor="title">Title:</Label>
          <TextInput id="title" type="text" />
        </div>
        <div>
          <Label htmlFor="slug">Slug:</Label>
          <TextInput id="slug" type="text" />
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
        <div className="mt-8">
          <Label htmlFor="short-content">Short Content:</Label>
          <Textarea id="short-content" rows={5} />
        </div>
        <div>
          <Label htmlFor="image">Select Image:</Label>
          <FileInput id="image" accept="image/*" />
        </div>
        <div>
          <Label htmlFor="category">Select Category:</Label>
          <Select id="category">
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="comment">Show Comment:</Label>
          <Select id="comment">
            <option value="yes">Yes</option>
            <option value="no">no</option>
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
