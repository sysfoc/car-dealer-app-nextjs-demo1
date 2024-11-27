"use client";
import { Select, Label } from "flowbite-react";
import LeasingCarsDetail from "@/app/components/LeasingCarsDetail";
export default function Home() {
  return (
    <section className="mx-4 my-10">
      <div className="relative mt-4 flex flex-wrap justify-between gap-5 md:flex-nowrap">
        <div className="w-full p-2 md:w-1/4">
          <h3 className="text-xl font-semibold text-blue-950">
            Configure your deal
          </h3>
          <div>
            <p className="mt-2">In stock and available now</p>
          </div>
          <div className="my-3 flex flex-col gap-y-3">
            <div>
              <Label htmlFor="min-monthly-price">Min monthly price</Label>
              <Select id="min-monthly-price">
                <option value="any">Any</option>
                <option value="$1000">$1000</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="max-monthly-price">Max monthly price</Label>
              <Select id="max-monthly-price">
                <option value="any">Any</option>
                <option value="$1000">$1000</option>
              </Select>
            </div>
          </div>
          <h3 className="mt-5 text-xl font-semibold text-blue-950">Filters</h3>
          <div className="my-3 flex flex-col gap-y-3">
            <div>
              <Label htmlFor="make">Make</Label>
              <Select id="make">
                <option value="any">Any</option>
                <option value="$1000">$1000</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Select id="model">
                <option value="any">Any</option>
                <option value="$1000">$1000</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="model-variant">Model Variant</Label>
              <Select id="model-variant">
                <option value="any">Any</option>
                <option value="$1000">$1000</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="body-type">Body Type</Label>
              <Select id="body-type">
                <option value="any">Any</option>
                <option value="$1000">$1000</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="min-seats">Min Seats</Label>
              <Select id="min-seats">
                <option value="any">Any</option>
                <option value="$1000">$1000</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="max-seats">Max Seats</Label>
              <Select id="max-seats">
                <option value="any">Any</option>
                <option value="$1000">$1000</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="fuel-type">Fuel Type</Label>
              <Select id="fuel-type">
                <option value="any">Any</option>
                <option value="$1000">$1000</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="gearbox">Gearbox</Label>
              <Select id="gearbox">
                <option value="any">Any</option>
                <option value="$1000">$1000</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="min-engine-size">Min Engine Size</Label>
              <Select id="min-engine-size">
                <option value="any">Any</option>
                <option value="$1000">$1000</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="max-engine-size">Max Engine Size</Label>
              <Select id="max-engine-size">
                <option value="any">Any</option>
                <option value="$1000">$1000</option>
              </Select>
            </div>
          </div>
        </div>
        <div className="w-full md:w-5/6">
          <div>
            <h2 className="mt-4 text-3xl">
              <strong className="text-blue-950 dark:text-red-500">41</strong>{" "}
              car lease deals for{" "}
              <strong className="text-blue-950 dark:text-red-500">
                Audi A8
              </strong>{" "}
              available
            </h2>
            <p className="my-2 text-lg">
              Results are based on the lowest monthly prices available. Terms
              for each vehicle may vary.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            <LeasingCarsDetail />
            <LeasingCarsDetail />
            <LeasingCarsDetail />
            <LeasingCarsDetail />
          </div>
        </div>
      </div>
    </section>
  );
}
