import BrandsList from "@/app/components/BrandsList";
import ChooseUs from "@/app/components/ChooseUs";
import { Button, Card, Label, TextInput } from "flowbite-react";

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
          <div className="w-full sm:w-[50%]">
            <Card>
              <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                How much is your car worth right now?
              </h5>
              <p className="text-center font-normal text-gray-700 dark:text-gray-400">
                Get a valuation in seconds - it could be worth more than you
                think!
              </p>
              <div>
                <form>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <Label htmlFor="registeration">Registration</Label>
                      <TextInput
                        type="text"
                        className="mt-1"
                        placeholder="H.M 1234 CDE"
                        id="registeration"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="mileage">Current mileage</Label>
                      <TextInput
                        type="number"
                        className="mt-1"
                        placeholder="H.M 1000"
                        id="mileage"
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-center">
                    <Button size={"md"} className="bg-blue-950 dark:bg-red-500">
                      Get my instant valuation
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
      <BrandsList/>
      <ChooseUs/>
    </>
  );
}
