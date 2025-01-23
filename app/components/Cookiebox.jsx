import { Button } from "flowbite-react";
import React from "react";

const Cookiebox = () => {
  return (
    <section className="fixed bottom-3 right-3 z-10 shadow-lg">
      <div className="w-[350px] rounded-md bg-white px-6 py-4 dark:bg-gray-700">
        <div>
          <div>
            <h2 className="text-lg font-bold">We Use Cookies</h2>
            <p className="mt-2">
              We use cookies in order to enhance the overall user experience.
            </p>
          </div>
          <div className="mt-5 flex flex-col gap-1">
            <Button color={"dark"}>Only Essentials</Button>
            <Button color={"dark"}>Accept All</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cookiebox;
