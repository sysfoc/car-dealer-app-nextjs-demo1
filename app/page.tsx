import Herosection from "./components/Herosection"
import VehicalsList from "./components/VehicalsList"
import BrandsList from "./components/BrandsList"
export default function Home() {
  return (
    <div>
      <Herosection/>
      <BrandsList/>
      <VehicalsList/>
    </div>
  );
}
