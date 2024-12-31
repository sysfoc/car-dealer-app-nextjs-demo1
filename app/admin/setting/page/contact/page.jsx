"use client";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const page = () => {
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
      <h2 className="text-xl font-semibold">Contact Us</h2>
      <form className="mt-5 flex flex-col gap-3">
        <div>
          <Label htmlFor="heading">Heading:</Label>
          <TextInput id="heading" placeholder="Contact Us" />
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
        <div>
          <Label htmlFor="name">Name:</Label>
          <TextInput id="name" placeholder="John Doe" />
        </div>
        <div>
          <Label htmlFor="address">Address:</Label>
          <TextInput id="address" placeholder="Street # 3 - Washington DC" />
        </div>
        <div>
          <Label htmlFor="phone">Phone No:</Label>
          <TextInput id="phone" placeholder="+123 32323332" />
        </div>
        <div>
          <Label htmlFor="map">Map (iFrame Code):</Label>
          <Textarea
            id="map"
            rows={5}
            placeholder='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.3833161665298!2d-118.03745848530627!3d33.85401093559897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd2c6c97f8f3ed%3A0x47b1bde165dcc056!2sOak+Dr%2C+La+Palma%2C+CA+90623%2C+USA!5e0!3m2!1sen!2sbd!4v1544238752504" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
          />
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

export default page;
