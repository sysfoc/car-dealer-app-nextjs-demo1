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
    "indent",
    "link",
    "image",
  ];

  return (
    <section className="my-10">
      <h2 className="text-xl font-semibold">Privacy policy</h2>
      <form className="mt-5 flex flex-col gap-3">
        <div>
          <Label htmlFor="name">Name</Label>
          <TextInput id="name" placeholder="Privacy Policy" />
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
