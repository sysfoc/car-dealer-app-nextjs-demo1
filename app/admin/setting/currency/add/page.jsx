import { Button, Label, Select, TextInput } from "flowbite-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="my-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Add New Currency</h2>
        </div>
        <div>
          <Link
            href={"/admin/setting/currency"}
            className="rounded-lg bg-blue-500 p-3 text-sm text-white"
          >
            View All
          </Link>
        </div>
      </div>
      <form className="mt-5 flex flex-col gap-3">
        <div>
          <Label htmlFor="name">Name</Label>
          <TextInput
            type="name"
            id="name"
            autoComplete="on"
            placeholder="USD"
          />
        </div>
        <div>
          <Label htmlFor="symbol">Symbol</Label>
          <TextInput type="text" id="symbol" placeholder="Add Currency Symbol (Like $)" />
        </div>
        <div>
          <Label htmlFor="value">Value</Label>
          <TextInput type="number" id="value" placeholder="1" />
        </div>
        <div>
          <Label htmlFor="is-default">Is Default?</Label>
          <Select id="is-default">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </div>
        <div>
          <Button type="submit" className="mt-3 w-full" color={"dark"}>
            Add Currency
          </Button>
        </div>
      </form>
    </section>
  );
};

export default page;
