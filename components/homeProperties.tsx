import React from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { Iproperty } from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";
import { myFont } from "./fonts";


const homeProperties = async () => {
  const data = await fetchProperties();
  if (!data?.properties) {
    return (
      <div className="text-center text-white">Error loading properties</div>
    );
  }
  const randomProperties = data.properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className="px-4 pt-2 pb-10 linkbuttonskygray2">
        <div className="container m-auto">
          <h2 className={`xl:text-4xl text-3xl ${myFont.className} tracking-wider bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 bg-clip-text text-transparent text-shadow-white/30 text-shadow-[0_0_30px] mt-7 mb-8 md:mb-6 text-center`}>
            Properties
          </h2>
          <div className="md:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:overflow-y-hidden md:h-111 lg:h-auto">
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
      <section className="mx-auto max-w-lg -mt-6 mb-6 px-6">
        <Link
          href="/properties"
          className="block linkbuttongray text-white text-center text-sm lg:text-base py-2.5 lg:py-3 px-6 rounded-xl"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default homeProperties;
