"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PropertySearchForm = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const router = useRouter();

  // Handle form submission logic here
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (location === "" && propertyType === "All") {
      // If both fields are empty, redirect to the properties page
      router.push("/properties");
    } else {
      const query = new URLSearchParams();
      if (location) query.set("location", encodeURIComponent(location));
      if (propertyType && propertyType !== "All")
        query.set("propertyType", encodeURIComponent(propertyType));

      query.set("page", "1"); // Always go to page 1
      query.set("pageSize", "6");

      router.push(`/properties/search-results?${query.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 md:mt-6 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center -mb-3"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-1.5 md:mb-0">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          type="text"
          id="location"
          placeholder="Enter Property Name or Location"
          className="w-full placeholder:text-sm placeholder:lg:text-base placeholder:text-center px-4 h-9 lg:h-11 rounded-lg bg-black/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-2">
        <label htmlFor="property-type" className="sr-only">
          Property Type
        </label>
        <select
          id="property-type"
          className="w-full placeholder:text-sm text-sm lg:text-base px-4 h-9 lg:h-11 rounded-lg bg-black/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="CabinOrCottage">Cabin or Cottage</option>
          <option value="Loft">Loft</option>
          <option value="Room">Room</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="md:ml-4 text-sm lg:text-base mt-2 md:mt-0 w-full md:w-auto px-6 h-9 lg:h-11 rounded-lg text-white linkbuttonamber focus:outline-none focus:ring focus:ring-white/50"
      >
        Search
      </button>
    </form>
  );
};

export default PropertySearchForm;
