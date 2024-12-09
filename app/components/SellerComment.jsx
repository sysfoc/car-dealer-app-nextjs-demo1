import React from "react";
import { FaCommentDots } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SellerComment = ({ loadingState }) => {
  const loading = loadingState;
  return (
    <div className="sticky top-1">
      <div className="mt-8 flex items-center gap-3 bg-blue-950 p-3 dark:bg-gray-700">
        <div>
          <FaCommentDots fontSize={25} className="text-white" />
        </div>
        <h3 className="text-lg font-bold uppercase text-white">
          Seller Comments
        </h3>
      </div>
      {loading ? (
        <div>
          <Skeleton count={25} height={18} />
        </div>
      ) : (
        <div className="p-4 text-gray-600 shadow-md dark:text-gray-300">
          <p>
            Toyota Corolla Altis 2016 – Excellent Condition Price: [4,150,000]
          </p>
          <p>Location: [Johar Town, Lahore]</p>
          <p>Mileage: [99,500]KM,S </p>
          <p>Transmission:[Automatic] </p>
          <p>Fuel Type: Petrol Color: [Silver]</p>
          <ul className="mt-3 list-inside list-disc">
            <li>Condition 9/10</li>
            <li>Well-maintained, non-accidental vehicle</li>
            <li>Mileage 8k km driven</li>
            <li>Comprehensive service history available</li>
            <li>Smooth automatic transmission</li>
            <li>Comfortable leather seats</li>
            <li>Touchscreen multimedia system</li>
            <li>Climate control air conditioning</li>
            <li>Recently serviced and no mechanical issues</li>
            <li>New Tyers</li>
            <li>Alloy rims</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SellerComment;
