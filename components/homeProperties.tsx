import React from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { Iproperty } from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";

const homeProperties = async () => {
  const data = await fetchProperties();
  const randomProperties = data.properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className="px-4 pt-2 pb-10 linkbuttonskygray">
        <div className="container m-auto">
          <h2 className="xl:text-4xl lg:text-3xl text-2xl text-shadow-[0_0_2px] text-shadow-white font-Title2 tracking-wider font-extrabold text-teal-300 mt-6 mb-10 text-center">
            Properties
          </h2>
          <div className="md:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:overflow-y-hidden md:h-125 lg:h-auto">
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
