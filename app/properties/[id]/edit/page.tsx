import React from "react";
import PropertyEditForm from "@/components/propertyEditForm";

const PropertyEditPage = () => {
  return (
    <section>
      <div className="container m-auto max-w-2xl lg:pt-4 pb-6">
        <div className="bg-orange-400/90 p-6 lg:py-8 mb-4 shadow-md rounded-xl m-3 md:m-0">
          <PropertyEditForm />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
