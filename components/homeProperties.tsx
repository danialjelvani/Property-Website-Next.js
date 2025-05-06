import React from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { Iproperty } from "@/components/PropertyCard";
import {fetchProperties} from "@/utils/requests";

const homeProperties = async () => {
  const properties = await fetchProperties();
  const randomProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container m-auto">
          <h2
            style={{ textShadow: "0px 0px 10px rgba(0, 0, 0, 0.9)" }}
            className="text-4xl font-Title2 tracking-wider font-extrabold text-teal-300 mt-8 mb-12 text-center"
          >
            Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {randomProperties.length === 0 ? (
              <p>No properties found.</p>
            ) : (
              randomProperties.map((property: Iproperty) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-lg my-6 px-6">
        <Link
          href="/properties"
          className="block linkbuttonemerald text-white text-center py-4 px-6 rounded-xl"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default homeProperties;
