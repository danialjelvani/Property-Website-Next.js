"use client";
import React, { useState } from "react";
import { Iproperty } from "./PropertyCard";
import Link from "next/link";
import Image from "next/image";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaDollarSign,
  FaMapMarker,
} from "react-icons/fa";

const FeaturedPropertyCard = ({ property }: { property: Iproperty }) => {
  const [retryKey, setRetryKey] = useState(0);

  const { rates } = property;
  function getrates() {
    if (rates.monthly) return `${rates.monthly.toLocaleString()}/mo`;
    if (rates.weekly) return `${rates.weekly.toLocaleString()}/wk`;
    if (rates.nightly) return `${rates.nightly.toLocaleString()}/night`;
  }

  const images = property.images.map((str) => JSON.parse(str));

  return (
    <div className="bg-white/60 rounded-xl shadow-md flex flex-col">
      <div className="relative h-60 w-full">
        <Image
          key={retryKey}
          src={images[0].url}
          alt="property image"
          fill={true}
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => {
            if (retryKey < 5) {
              setRetryKey(retryKey + 1);
            }
          }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN899DREwAHMAJbOoc+7QAAAABJRU5ErkJggg=="
          className="w-full h-auto [mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)] shadow-lg shadow-black
              rounded-t-xl"
        />
        <h3 className="absolute inline-block top-3 right-3 text-sm bg-black/80 px-2.5 py-1.5 rounded-lg text-blue-300 font-bold text-center">
          ${getrates()}
        </h3>
        <div className="bg-gradient-to-b from-black/0 via-black/0 to-black/30 z-10 absolute top-0 left-0 w-full h-full"></div>
      </div>
      <div className="p-5 flex flex-col">
        <h3 className="text-black text-lg lg:text-xl font-bold mb-1">{property.name}</h3>
        <div className="text-gray-700 mb-1">{property.type}</div>

        <div className="flex justify-center gap-4 text-sm lg:text-base text-gray-600 mb-2">
          <p>
            <FaBed className="inline-block mb-0.5 mr-0.5" /> {property.beds}{" "}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline-block mb-1.5 mr-0.5" /> {property.baths}{" "}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mb-1 mr-1.5" />
            {property.square_feet}{" "}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>
        <div className="flex justify-center gap-2 text-rose-600 text-sm mb-2">
          {rates.nightly && (
            <p>
              <FaDollarSign className="inline-block mb-1.5" />Nightly
            </p>
          )}
          {rates.weekly && (
            <p>
              <FaDollarSign className="inline-block mb-1.5" />Weekly
            </p>
          )}
          {rates.monthly && (
            <p>
              <FaDollarSign className="inline-block mb-1.5" />Monthly
            </p>
          )}
        </div>
        <div className="border border-gray-300 mb-2"></div>
        <div className="flex flex-col lg:flex-row justify-between text-sm lg:text-base">
          <div className="flex align-middle gap-2 mb-3 lg:mb-0">
            <FaMapMarker className="inline-block mt-1 text-orange-700" />
            <span className="text-orange-700">
              {" "}
              {property.location.city} {property.location.state}{" "}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 active:bg-blue-600 active:scale-95 transition-transform text-white px-13 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
