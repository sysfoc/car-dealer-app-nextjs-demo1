"use client";
import React, { useState } from "react";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";

export default function Page() {
  const [value, setValue] = useState("");
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
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
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Edit Post</h2>
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
              <Label htmlFor="slug">Content</Label>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
                className="mb-12 h-72"
              />
            </div>
            <div>
              <Label htmlFor="image">Existed Image</Label>
              <Image
                width={150}
                height={150}
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
                <option value="$1000">parent blog</option>
              </Select>
            </div>
            <div>
              <Button color={"blue"}>Update</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
