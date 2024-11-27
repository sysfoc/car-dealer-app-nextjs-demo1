import BrandsList from "@/app/components/BrandsList";
import ChooseUs from "@/app/components/ChooseUs";
import { Button, Card, Label, Select } from "flowbite-react";
import { AiOutlineDollar } from "react-icons/ai";
import { MdSell } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <section
        className="min-h-screen w-full"
        style={{
          background: "url('/sydney.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundColor: "#000000bf",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="flex min-h-screen w-full items-center justify-center px-5">
          <div className="w-full sm:w-[45%]">
            <Card>
              <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Get a free car valuation in a minute
              </h5>
              <p className="text-center font-normal text-gray-700 dark:text-gray-400">
                What kind of valuation are you doing?
              </p>
              <div className="flex items-center gap-x-3">
                <Button color={"dark"}>
                  <AiOutlineDollar className="mr-2" fontSize={20} />
                  Im Selling
                </Button>
                <Button color={"dark"} outline>
                  <MdSell className="mr-2" fontSize={20} />
                  Im Buying
                </Button>
                <Button color={"dark"} outline>
                  <FaExchangeAlt className="mr-2" fontSize={20} />
                  Im Trading in
                </Button>
              </div>
              <div>
                <form>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <Label htmlFor="make">Make</Label>
                      <Select id="make">
                        <option value="select">Select</option>
                        <option value="volvo">Volvo</option>
                        <option value="bmw">BMW</option>
                        <option value="audi">Audi</option>
                      </Select>
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="model">Model</Label>
                      <Select id="model">
                        <option value="select">Select</option>
                        <option value="volvo">Volvo</option>
                        <option value="bmw">BMW</option>
                        <option value="audi">Audi</option>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-center">
                    <Button size={"md"} color={"dark"}>
                      Get my valuation
                    </Button>
                  </div>
                  <div className="mt-8">
                    <p className="text-center">Quick. Free. No obligation.</p>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <BrandsList />
      <ChooseUs />
    </>
  );
}
