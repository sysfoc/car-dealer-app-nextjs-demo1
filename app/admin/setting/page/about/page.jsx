"use client";
import { Button, Label, TextInput } from "flowbite-react";
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
      <h2 className="text-xl font-semibold">About Us</h2>
      <form className="mt-5 flex flex-col gap-3">
        <div>
          <Label htmlFor="name">Name</Label>
          <TextInput id="name" placeholder="About us" />
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
          <Button type="submit" className="mt-3 w-full" color={"dark"}>
            Save Updates
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Page;
