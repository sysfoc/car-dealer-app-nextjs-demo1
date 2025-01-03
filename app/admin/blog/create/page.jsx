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
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";

const Page = () => {
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
          <Label htmlFor="content">Content:</Label>
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
