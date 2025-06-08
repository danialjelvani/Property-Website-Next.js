import React from "react";
import dynamic from "next/dynamic";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheck,
  FaMapMarker,
  FaTimes,
} from "react-icons/fa";

const MapViewer = dynamic(() => import("@/components/mapViewer"), {
  ssr: false, // Disable server-side rendering to fix window is not defined error
});

const propertyDetails = ({ property }: any) => {
  return (
    <section>
      <div className="bg-orange-400/90 p-6 rounded-xl shadow-md text-center md:text-left">
        <div className="text-gray-800 mb-4">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarker className="text-lg text-orange-800 mr-1 mt-0.5" />
          <p className="text-orange-800">
            {property.location.street}, {property.location.city},{" "}
            {property.location.state}, {property.location.zip}
          </p>
        </div>
        <div className="bg-gray-800 -mx-6">
          <h3 className="text-lg font-bold my-6 md:ml-6 text-yellow-500 p-2 w-full">
            Rates & Options
          </h3>
        </div>

        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-800 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-700 mr-2 font-bold">Nightly</div>
            <div className="text-2xl font-bold text-gray-800">
              {property.rates.nightly ? (
                `$${property.rates.nightly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-800 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-700 mr-2 font-bold">Weekly</div>
            <div className="text-2xl font-bold text-gray-800">
              {property.rates.weekly ? (
                `$${property.rates.weekly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-700 mr-2 font-bold">Monthly</div>
            <div className="text-2xl font-bold text-gray-800">
              {property.rates.monthly ? (
                `$${property.rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-400/90 p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-center gap-4 text-gray-800 mb-4 text-xl space-x-9">
          <p>
            <FaBed className="inline -mt-1 mr-1" /> {property.beds}
            <span className="hidden sm:inline"> Beds</span>
          </p>
          <p>
            <FaBath className="inline -mt-1.5 mr-1" /> {property.baths}
            <span className="hidden sm:inline"> Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline -mt-1 mr-2.5" />
            {property.square_feet}
            <span className="hidden sm:inline"> sqft</span>
          </p>
        </div>
        <p className="text-gray-800 mb-4">{property.description}</p>
      </div>

      <div className="bg-orange-400/90 p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>

        <ul className="grid grid-cols-1 text-gray-800 space-y-2 md:grid-cols-2 lg:grid-cols-3 list-none">
          {property.amenities.map((amenity: string, index: number) => (
            <li key={index} className="flex items-center">
              <FaCheck className="mr-2" /> {amenity}
            </li>
          ))}
        </ul>
      </div>


      {property.lat && property.lng && (<div className="bg-orange-400/90 p-6 rounded-lg shadow-md mt-6 -mb-12">
        <MapViewer lat={parseFloat(property.lat)} lng={parseFloat(property.lng)} />
      </div>)}

    </section>
  );
};

export default propertyDetails;
