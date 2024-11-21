import { LuCrown } from "react-icons/lu";
import Slider from "../../components/Slider"
import Table from "../../components/Tables"
import { Button } from "flowbite-react";
export default function Home() {
  return (
    <section className="mx-4 my-5 sm:mx-8">
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-3">
        <div className="col-span-2">
          <div className="flex items-center gap-2 bg-blue-950 dark:bg-gray-700 p-3">
            <div>
                <LuCrown fontSize={25} className="text-white"/>
            </div>
            <h3 className="text-lg font-bold uppercase text-white">
              Used Vehical
            </h3>
          </div>
          <div>
            <Slider/>
          </div>
          <div className="my-5">
            <h3 className="font-semibold text-2xl">2010 Ford Falcon FG XR8 Ute Super Cab 6 Speed Manual Utility</h3>
            <h4 className="text-3xl font-semibold text-blue-950 dark:text-red-500 my-2">$39,990</h4>
          </div>
          <div>
            <Button size={'lg'} className="bg-blue-950 text-white dark:bg-gray-700">Enquire Now</Button>
          </div>
        </div>
        <div>
            <Table/>
        </div>
      </div>
    </section>
  );
}
