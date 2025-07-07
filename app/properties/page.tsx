import React from "react";
import PropertySearchForm from "@/components/propertySearchForm";
import Properties from "@/components/properties";

const PropertiesPage = async () => {
  return (
    <>
      {" "}
      <section className="px-4 md:h-10 -mb-8">
        <div>
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
};

export default PropertiesPage;
