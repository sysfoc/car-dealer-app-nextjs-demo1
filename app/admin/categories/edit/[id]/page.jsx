import { Button, Label, TextInput } from "flowbite-react";
import React from "react";

const page = () => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Edit Category</h2>
      <div>
        <div>
          <form className="mt-8 flex flex-col gap-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <TextInput id="name" placeholder="This is my first category" />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <TextInput id="slug" placeholder="This is my first category" />
            </div>
            <div>
              <Button color={"blue"}>Update</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
