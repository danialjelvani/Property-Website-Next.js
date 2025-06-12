"use client";
import React from "react";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import ScrollRestorer from "@/components/scrollRestorer";
import { Iproperty } from "@/components/PropertyCard";
import LoadingSpinner from "@/app/loading";

const Properties = () => {
  const [properties, setProperties] = useState<Iproperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
          setProperties([]);
          throw new Error("failed to fetch properties");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p className="text-teal-200 text-shadow-md text-shadow-white/30 text-center">
            No properties found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property: Iproperty) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
      <ScrollRestorer />
    </section>
  );
};

export default Properties;
