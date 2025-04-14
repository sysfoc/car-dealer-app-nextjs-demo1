import { notFound } from "next/navigation";
import Image from "next/image";
import { Avatar, Button, Label, Textarea, TextInput } from "flowbite-react";
import { FaEye } from "react-icons/fa";
import { IoMdAlarm } from "react-icons/io";

type ParamsType = {
  slug: string;
};

const Page = async ({ params }: { params: ParamsType }) => {
  const { slug } = params;

  let blog = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blog/${slug}`, {
      cache: "no-store", 
    });

    if (!res.ok) throw new Error("Blog not found");

    const data = await res.json();
    blog = data;
  } catch (error) {
    notFound();
  }

  if (!blog) {
    return <div className="p-10 text-red-500 text-xl">Blog not found or API failed.</div>;
  }

  return (
    <section className="mx-4 my-5 sm:mx-16">
      <div className="grid grid-cols-1 items-center gap-x-10 gap-y-5 py-5 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={blog.image || "/default.jpg"}
            alt={blog.title || "Blog image"}
            width={500}
            height={300}
            className="size-full"
          />
        </div>
        <div>
          <div className="flex flex-row items-center gap-3">
            <button className="inline-flex items-center rounded-lg bg-blue-950 px-3 py-2 text-center text-sm font-medium text-white dark:bg-red-500">
              {blog.category || "Uncategorized"}
            </button>
            <div className="flex items-center gap-2">
              <IoMdAlarm fontSize={18} />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <h1 className="mt-3 text-2xl font-bold sm:mt-5 sm:text-4xl">{blog.h1 || blog.metaTitle}</h1>
          <div className="mt-5 flex items-center gap-10">
            <div className="flex items-center gap-3">
              <Avatar size={"sm"} rounded />
              <span>{blog.author || "Anonymous"}</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <FaEye fontSize={18} />
              <span>{blog.views || 0} views</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full md:w-3/4">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />

        <div>
          <h2 className="mt-8 text-2xl font-bold">Comments</h2>
          <form>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col">
                  <Label htmlFor="fname">First Name:</Label>
                  <TextInput type="text" id="fname" placeholder="First Name" />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="lname">Last Name:</Label>
                  <TextInput type="text" id="lname" placeholder="Last Name" />
                </div>
                <div className="col-span-2 flex flex-col">
                  <Label htmlFor="email">Email:</Label>
                  <TextInput
                    type="email"
                    id="email"
                    placeholder="Email Address"
                  />
                </div>
                <div className="col-span-2 flex flex-col">
                  <Label htmlFor="comment">Add Comment:</Label>
                  <Textarea rows={10} id="comment" />
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  size={"sm"}
                  className="mt-5 rounded-lg bg-blue-950 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-500 dark:bg-red-500 dark:hover:bg-blue-950"
                >
                  Add Comment
                </Button>
              </div>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Page;
