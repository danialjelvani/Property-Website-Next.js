import React from "react";

const hero = () => {
  return (
    <div>
      <section className="bg-[#1D1C15]/40 md:py-20 py-7 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-black font-Title2 text-teal-200 sm:text-5xl md:text-6xl">
              Find The Perfect Rental
            </h1>
            <p className="my-4 text-xl text-teal-300">
              Discover the perfect property that suits your needs.
            </p>
          </div>
          {/*         <!-- Form Component -->
           */}{" "}
          <form className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center">
            <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
              <label htmlFor="location" className="sr-only">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Enter Location (City, State, Zip, etc)"
                className="w-full px-4 py-3 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div className="w-full md:w-2/5 md:pl-2">
              <label htmlFor="property-type" className="sr-only">
                Property Type
              </label>
              <select
                id="property-type"
                className="w-full px-4 py-3 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="All">All</option>
                <option value="Apartment">Apartment</option>
                <option value="Studio">Studio</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Cabin Or Cottage">Cabin or Cottage</option>
                <option value="Loft">Loft</option>
                <option value="Room">Room</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg text-white linkbuttonamber focus:outline-none focus:ring focus:ring-white/50"
            >
              Search
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default hero;
