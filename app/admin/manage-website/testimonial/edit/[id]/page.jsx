"use client";
import { Button, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  console.log("Fetching testimonial for ID:", id);

  const [testimonial, setTestimonial] = useState({
    name: "",
    designation: "",
    content: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("Invalid testimonial ID");
      return;
    }
    fetch(`/api/testimonial/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setTestimonial({
            name: data.name || "",
            designation: data.designation || "",
            content: data.content || "",
            image: null,
          });
          setPreviewImage(data.image || null);
        }
      })
      .catch((error) => {
        console.error("Error fetching testimonial:", error);
        Swal.fire("Error!", "Failed to fetch testimonial data.", "error");
      });
  }, [id]);

  const handleChange = (e) => {
    setTestimonial({ ...testimonial, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTestimonial({ ...testimonial, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      Swal.fire("Error!", "Invalid testimonial ID!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", testimonial.name);
    formData.append("designation", testimonial.designation);
    formData.append("content", testimonial.content);
    if (testimonial.image) {
      formData.append("image", testimonial.image);
    }

    try {
      const response = await fetch(`/api/testimonial/${id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      console.log("Update response:", result);
      if (response.ok) {
        Swal.fire(
          "Success!",
          "Testimonial updated successfully!",
          "success",
        ).then(() => {
          router.push("/admin/manage-website/testimonial");
        });
      } else {
        Swal.fire(
          "Error!",
          result.error || "Failed to update testimonial",
          "error",
        );
      }
    } catch (error) {
      console.error("Error updating testimonial:", error);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  return (
    <section className="my-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Testimonial</h2>
        <Link
          href={"/admin/manage-website/testimonial"}
          className="rounded-lg bg-blue-500 p-3 text-sm text-white"
        >
          View All
        </Link>
      </div>

      <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Name:</Label>
          <TextInput
            id="name"
            type="text"
            placeholder="Enter Name"
            value={testimonial.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="designation">Designation:</Label>
          <TextInput
            id="designation"
            type="text"
            placeholder="Enter Designation"
            value={testimonial.designation}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="content">Content:</Label>
          <Textarea
            id="content"
            rows={5}
            placeholder="Enter Content"
            value={testimonial.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="image">Image:</Label>
          <FileInput id="image" accept="image/*" onChange={handleFileChange} />
          {previewImage && (
            <Image
              src={previewImage}
              alt="Preview"
              width={80}
              height={80}
              className="mt-3 rounded-md object-cover"
            />
          )}
        </div>
        <Button type="submit" className="mt-3 w-full" color="dark">
          Update Changes
        </Button>
      </form>
    </section>
  );
};

export default Page;
