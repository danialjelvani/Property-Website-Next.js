import React from "react";
import PropertyCard from "@/components/PropertyCard";
import { Iproperty } from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";
import ScrollRestorer from "@/components/scrollRestorer";

const PropertiesPage = async () => {
  const properties = await fetchProperties();
  properties.sort(
    (a: Iproperty, b: Iproperty) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found.</p>
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

export default PropertiesPage;
