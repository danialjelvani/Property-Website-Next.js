"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Iproperty } from "@/components/PropertyCard";
import LoadingSpinner from "@/app/loading";
import PropertyCard from "@/components/PropertyCard";
import { FaArrowLeft } from "react-icons/fa";
import ScrollRestorer from "@/components/scrollRestorer";
import PropertySearchForm from "@/components/propertySearchForm";
import Pagination from "@/components/pagination";

const SearchResultsPage = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Iproperty[]>([]);
  const [total, setTotal] = useState(0);

  const searchParams = useSearchParams();

  const location = searchParams.get("location") || "";
  const propertyType = searchParams.get("propertyType") || "All";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "6", 10);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      const query = new URLSearchParams({
        location,
        propertyType,
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      try {
        const res = await fetch(`/api/properties/search?${query.toString()}`);
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data.properties);
          setTotal(data.total);
        } else {
          console.log(res.statusText);
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType, page, pageSize]);

  return (
    <>
      {" "}
      <section className="px-4 md:h-10">
        <div>
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div
            className="bg-black/40 grid grid-cols-3 items-center h-20 mt-2
                  [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_80%,transparent)]"
          >
            <div>
              <Link
                href="/properties"
                scroll={false}
                className="text-white hover:text-yellow-600 xl:ml-20 md:inline-block mt-2 text-xs md:text-base
                      active:text-shadow-2xs active:text-shadow-yellow-200 active:transition-all active:duration-200
                      flex items-center"
              >
                <FaArrowLeft className="inline w-5 m-2 mt-1" />{" "}
                <span className="md:mb-0 mb-1.5">Back to Properties Page</span>
              </Link>
            </div>{" "}
            <h1
              className="xl:text-3xl md:text-2xl text-base text-center text-shadow-md text-shadow-white/30
             text-white tracking-wide font-Title2 col-start-2"
            >
              Search Results
            </h1>
            <p className="text-xs md:text-sm text-white text-center">
              {total} result{total === 1 ? "" : "s"} found
            </p>
          </div>
          <section className="px-4 -mt-18">
            <div className="container-xl lg:container m-auto px-4 py-6 mt-17">
              {properties.length === 0 ? (
                <p className="text-white text-shadow-md text-shadow-white/30 text-center">
                  No search results found
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
        </div>
      )}
    </>
  );
};

export default SearchResultsPage;
