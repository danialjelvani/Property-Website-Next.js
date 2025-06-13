"use client";
import React from "react";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import ScrollRestorer from "@/components/scrollRestorer";
import { Iproperty } from "@/components/PropertyCard";
import LoadingSpinner from "@/app/loading";
import Pagination from "@/components/pagination";
import { useSearchParams } from "next/navigation";

const Properties = () => {
  const [properties, setProperties] = useState<Iproperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const pageSize = 6;

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data.properties);
          setTotal(data.total);
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
  }, [page, pageSize]);

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
        <Pagination page={page} pageSize={pageSize} total={total} />
      </div>
      <ScrollRestorer />
    </section>
  );
};

export default Properties;
