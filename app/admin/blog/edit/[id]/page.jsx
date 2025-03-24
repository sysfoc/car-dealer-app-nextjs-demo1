"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function EditBlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [h1, setH1] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    if (!blogId) return;
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${blogId}`);
        const data = await response.json();
        if (response.ok) {
          setH1(data.h1);
          setSlug(data.slug);
          setMetaTitle(data.metaTitle);
          setMetaDescription(data.metaDescription);
          setContent(data.content);
          setCategoryId(data.categoryId);
          setExistingImage(data.image);
        } else {
          alert("Failed to fetch blog data");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("h1", h1);
    formData.append("slug", slug);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("content", content);
    formData.append("categoryId", categoryId);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(`/api/blog/${blogId}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Blog updated successfully");
        router.push("/admin/blog");
      } else {
        alert(result.error || "Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Something went wrong. Try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Blog Post</h2>
        <Link
          href="/admin/blog"
          className="rounded-lg bg-blue-500 p-3 text-sm text-white"
        >
          View All
        </Link>
      </div>

      <form className="mt-8 flex flex-col gap-y-5" onSubmit={handleUpdate}>
        <div>
          <Label htmlFor="h1">H1 Title</Label>
          <TextInput
            id="h1"
            value={h1}
            onChange={(e) => setH1(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <TextInput
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="metaTitle">Meta Title</Label>
          <TextInput
            id="metaTitle"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
          />
        </div>

        <div>
          <Label>Content:</Label>
          <LazyJoditEditor
            value={content}
            config={{ height: 300 }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>

        <div>
          <Label htmlFor="category">Select Category</Label>
          <Select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </Select>
        </div>

        {/* Existing Image */}
        {existingImage && (
          <div>
            <Label>Existing Image</Label>
            <Image
              src={existingImage}
              width={150}
              height={150}
              alt="Existing Image"
            />
          </div>
        )}

        {/* Upload New Image */}
        <div>
          <Label htmlFor="image">Upload New Image</Label>
          <TextInput
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div>
          <Button color="dark" className="w-full" type="submit">
            Update Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
