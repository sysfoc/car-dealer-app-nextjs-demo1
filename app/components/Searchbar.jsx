import React from "react";
import { TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";

const Searchbar = () => {
  return (
    <TextInput
      type="search"
      size={"lg"}
      icon={CiSearch}
      placeholder="Search Our Inventory"
    />
  );
};

export default Searchbar;
