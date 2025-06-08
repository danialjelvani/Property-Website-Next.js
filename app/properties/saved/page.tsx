"use client";
import React from "react";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import LoadingSpinner from "@/app/loading";
import { toast } from "react-toastify";
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

  console.log(properties);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <section className="px-4 py-6">
      <h1 className="md:text-3xl text-xl text-center text-shadow-md text-shadow-white/30
       text-teal-300 tracking-wide md:mt-4 mb-2 font-Title2">Saved Properties</h1>
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
  );
};

export default SavedProperties;
