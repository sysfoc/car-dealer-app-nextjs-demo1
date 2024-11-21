import Herosection from "./components/Herosection"
import VehicalsList from "./components/VehicalsList"
import BrandsList from "./components/BrandsList"
import ChooseUs from "./components/ChooseUs"
import Services from "./components/Services"
export default function Home() {
  return (
    <div>
      <Herosection/>
      <BrandsList/>
      <VehicalsList/>
      <ChooseUs/>
      <Services/>
    </div>
  );
}
