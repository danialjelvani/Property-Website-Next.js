import React from "react";
import { FaBookmark } from "react-icons/fa";
import { Iproperty } from "@/components/PropertyCard";


const BookmarkButton = ({property}: {property: Iproperty}) => {
    if (!property) return null
  return (
    <button className="linkbuttongray text-white outline-1 outline-gray-100 font-bold w-full py-2 px-4 rounded-full cursor-pointer flex items-center justify-center">
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
