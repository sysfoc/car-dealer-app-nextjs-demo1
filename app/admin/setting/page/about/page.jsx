"use client";
import { Label, TextInput } from "flowbite-react";
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
    <section className="my-10">
      <div className="flex flex-col gap-3">
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
      </div>
    </section>
  );
};

export default Page;
