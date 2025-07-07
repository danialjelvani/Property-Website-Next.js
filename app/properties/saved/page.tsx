"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import LoadingSpinner from "@/app/loading";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { Iproperty } from "@/components/PropertyCard";

const SavedProperties = () => {
  const [properties, setProperties] = useState<Iproperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmark");
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          toast.error("Failed to load saved properties");
          console.log(res.statusText);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load saved properties");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div
        className="bg-black/40 grid grid-cols-3 items-center h-20 mt-2
                [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_80%,transparent)]"
      >
        <div className="">
          <Link
            href="/profile"
            scroll={false}
            className="text-white hover:text-yellow-600 xl:ml-20 md:inline-block mt-2 text-xs md:text-base
                    active:text-shadow-2xs active:text-shadow-yellow-200 active:transition-all active:duration-200
                    flex items-center"
          >
            <FaArrowLeft className="inline w-5 m-2 mt-1" />{" "}
            <span className="md:mb-0 mb-1.5 w-17">Back to Profile</span>
          </Link>
        </div>{" "}
        <h1
          className="xl:text-3xl md:text-2xl text-base text-center text-shadow-md text-shadow-white/30
           text-white tracking-wide font-Title2 col-start-2 "
        >
          Saved properties
        </h1>
      </div>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.length === 0 ? (
            <p>No saved properties</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property: Iproperty) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SavedProperties;
