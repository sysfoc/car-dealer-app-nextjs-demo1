"use client";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const PageEditor = () => {
  const [type, setType] = useState("about");
  const [formData, setFormData] = useState({ name: "", content: "" });

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: 500,
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/pages?type=${type}`);
      const result = await res.json();
      if (result?.data) {
        setFormData({
          name: result.data.name || "",
          content: result.data.content || "",
        });
      } else {
        setFormData({ name: "", content: "" });
      }
    };

    fetchData();
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, ...formData }),
    });

    const data = await res.json();
    if (data.message) {
      alert("Saved successfully!");
    }
  };

  return (
    <section className="my-10">
      <h2 className="mb-4 text-2xl font-bold">Static Pages Manager</h2>

      <div className="mb-6">
        <Label htmlFor="type">Select Page:</Label>
        <Select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="about">About Us</option>
          <option value="privacy">Privacy Policy</option>
          <option value="terms">Terms & Conditions</option>
        </Select>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <TextInput
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Suspense fallback={<p>Loading editor...</p>}>
            <LazyJoditEditor
              config={config}
              value={formData.content}
              onBlur={(newContent) =>
                setFormData({ ...formData, content: newContent })
              }
            />
          </Suspense>
        </div>
        <Button type="submit" color="dark">
          Save Updates
        </Button>
      </form>
    </section>
  );
};

export default PageEditor;
