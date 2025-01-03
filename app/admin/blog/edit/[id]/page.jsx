"use client";
import React, { useState, useEffect } from "react";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";

export default function Page() {
  const [value, setValue] = useState("");
  const [ReactQuill, setReactQuill] = useState(null);

  useEffect(() => {
    import("react-quill")
      .then((module) => {
        setReactQuill(() => module.default);
      })
      .catch((error) => {
        console.error("Error loading ReactQuill:", error);
      });
  }, []);

  const modules = {
    toolbar: [
      [
        { header: "1" },
        { header: "2" },
        { header: [1, 2, 3, 4, 5, 6, false] },
        { font: [] },
      ],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video", "formula"],
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
    "color",
    "background",
    "script",
    "blockquote",
    "code-block",
    "list",
    "indent",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];

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
              <Label htmlFor="content">Content</Label>
              {ReactQuill ? (
                <ReactQuill
                  id="content"
                  value={value}
                  onChange={setValue}
                  modules={modules}
                  formats={formats}
                  className="mb-12 h-72"
                />
              ) : (
                <p>Loading editor...</p>
              )}
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
