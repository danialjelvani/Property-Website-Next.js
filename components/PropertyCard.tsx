"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaDollarSign,
  FaMapMarker,
} from "react-icons/fa";

interface PropertyCardProps {
  property: Iproperty;
}
export interface Iproperty {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [retryKey, setRetryKey] = useState(0);
  const { rates } = property;
  function getrates() {
    if (rates.monthly) return `${rates.monthly.toLocaleString()}/mo`;
    if (rates.weekly) return `${rates.weekly.toLocaleString()}/wk`;
    if (rates.nightly) return `${rates.nightly.toLocaleString()}/night`;
  }
  const images = property.images.map((str) => JSON.parse(str));

  return (
    <div className="rounded-xl bg-[#2D1705]/70 shadow-[0_0_20px] shadow-black relative">
      <div className="relative xl:h-75 lg:h-60 md:h-45 h-75 w-auto">
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
          className="w-full h-auto [mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)] shadow-lg shadow-black rounded-t-xl"
        />
        <div className="bg-gradient-to-b from-black/0 via-black/0 to-black/30 z-10 absolute top-0 left-0 w-full h-full"></div>
      </div>

      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-4">
          <div className="text-yellow-500/80 mb-1">{property.type}</div>
          <h3 className="text-xl text-teal-300 text-shadow-sm text-shadow-black/60 md:min-h-[60px] font-bold">
            {property.name}
          </h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-black/70 px-4 py-2 rounded-lg text-yellow-500 font-bold text-right md:text-center lg:text-right">
          ${getrates()}
        </h3>

        <div className="flex justify-center gap-4 text-emerald-300 mb-4">
          <p>
            <FaBed className="inline -mt-1 mr-1" /> {property.beds}
            <span className="md:hidden lg:inline">
              {" "}
              {property.beds === 1 ? "Bed" : "Beds"}
            </span>
          </p>
          <p>
            <FaBath className="inline -mt-1 mr-1" /> {property.baths}
            <span className="md:hidden lg:inline">
              {" "}
              {property.baths === 1 ? "Bath" : "Baths"}
            </span>
          </p>
          <p>
            <FaRulerCombined className="inline -mt-1 mr-1" />{" "}
            {property.square_feet}
            <span className="md:hidden lg:inline"> sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 md:gap-3 text-emerald-300 text-sm mb-4">
          {rates.monthly && (
            <p>
              <FaDollarSign className="inline -mt-1 mr-0.5 md:mr-0" />
              Monthly
            </p>
          )}
          {rates.weekly && (
            <p>
              <FaDollarSign className="inline -mt-1 mr-0.5 md:mr-0" />
              Weekly
            </p>
          )}
          {rates.nightly && (
            <p>
              <FaDollarSign className="inline -mt-1 mr-0.5 md:mr-0" />
              Nightly
            </p>
          )}
        </div>

        <div className="border border-black/70 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-3">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="inline mt-0.5 -mr-1 text-red-600" />
            <span className="text-red-500">
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-[#A55406] w-[140px] text-teal-100 rounded-md px-4 py-2 text-center text-sm active:scale-95 transition duration-200 ease-in-out"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
