import React from "react";
import { FaShare } from "react-icons/fa";
import { Iproperty } from "@/components/PropertyCard";

const ShareButtons = ({property}: {property: Iproperty}) => {
    if (!property) return null
  return (
    <button className="linkbuttonred text-white outline-1 outline-red-100 font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaShare className="mr-2" /> Share Property
    </button>
  );
};

export default ShareButtons;
