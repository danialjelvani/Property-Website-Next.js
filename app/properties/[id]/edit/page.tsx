import React from "react";
import PropertyEditForm from "@/components/propertyEditForm";

const PropertyEditPage = () => {
  return (
    <section>
      <div className="container m-auto max-w-2xl py-3 md:py-14">
        <div className="bg-orange-400/90 px-6 py-8 mb-4 shadow-md rounded-xl m-4 md:m-0">
          <PropertyEditForm />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
