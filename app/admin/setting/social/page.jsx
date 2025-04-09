"use client";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

const SocialMediaForm = () => {
  const [formData, setFormData] = useState({ url: "", icon: "", order: 0 });
  const [list, setList] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState("");

  const fetchData = async () => {
    const res = await fetch("/api/socials");
    const json = await res.json();
    setList(json.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName);

    const selected = list.find((item) => item.icon === iconName);
    if (selected) {
      setFormData({
        url: selected.url || "",
        icon: selected.icon || "",
        order: selected.order || 0,
      });
    } else {
      setFormData({ url: "", icon: iconName || "", order: 0 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/socials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.message) {
      alert("Saved!");
      setFormData({ url: "", icon: "", order: 0 });
      setSelectedIcon("");
      fetchData();
    }
  };

  return (
    <section className="my-10">
      <h2 className="mb-4 text-2xl font-bold">Social Media Settings</h2>

      <div className="mb-4 max-w-md">
        <Label htmlFor="selectIcon">Select Existing Icon</Label>
        <Select
          id="selectIcon"
          value={selectedIcon}
          onChange={(e) => handleIconSelect(e.target.value)}
        >
          <option value="">-- Add New / Select Existing --</option>
          {list.map((item) => (
            <option key={item._id} value={item.icon}>
              {item.icon}
            </option>
          ))}
        </Select>
      </div>

      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <div>
          <Label htmlFor="url">URL</Label>
          <TextInput
            id="url"
            placeholder="https://facebook.com/yourpage"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="icon">Icon Name</Label>
          <TextInput
            id="icon"
            placeholder="facebook, twitter, instagram..."
            value={formData.icon}
            onChange={(e) => {
              setFormData({ ...formData, icon: e.target.value });
              setSelectedIcon(e.target.value);
            }}
          />
        </div>
        <div>
          <Label htmlFor="order">Order</Label>
          <TextInput
            id="order"
            type="number"
            value={formData.order}
            onChange={(e) =>
              setFormData({ ...formData, order: Number(e.target.value) })
            }
          />
        </div>
        <Button type="submit" color="dark">
          Save
        </Button>
      </form>
    </section>
  );
};

export default SocialMediaForm;
