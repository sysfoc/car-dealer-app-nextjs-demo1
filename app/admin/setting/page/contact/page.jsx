"use client";
import { useEffect, useState, Suspense } from "react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import dynamic from "next/dynamic";

const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Page = () => {
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    name: "",
    address: "",
    phone: "",
    map: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.contact) {
        setFormData(data.contact);
      }
    };
    fetchContact();
  }, []);

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: 500,
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.message) {
      alert("Contact saved successfully!");
    }
  };

  return (
    <section className="my-10">
      <h2 className="text-xl font-semibold">Contact Us</h2>
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <div>
          <Label htmlFor="heading">Heading:</Label>
          <TextInput
            id="heading"
            value={formData.heading}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="text-sm">Content:</p>
          <Suspense fallback={<p>Loading editor...</p>}>
            <LazyJoditEditor
              config={config}
              value={formData.content}
              onBlur={(newContent) =>
                setFormData({ ...formData, content: newContent })
              }
              onChange={() => {}}
            />
          </Suspense>
        </div>
        <div>
          <Label htmlFor="name">Name:</Label>
          <TextInput id="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="address">Address:</Label>
          <TextInput
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone No:</Label>
          <TextInput
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="map">Map (iFrame Code):</Label>
          <Textarea
            id="map"
            rows={5}
            value={formData.map}
            onChange={handleChange}
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

export default Page;
