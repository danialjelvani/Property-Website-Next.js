import React from "react";
import PropertyAddForm from "@/components/propertyAddForm";

const PropertiesAddPage = () => {
  return (
    <section>
      <div className="container m-auto max-w-2xl py-14">
        <div className="bg-orange-400/90 px-6 py-8 mb-4 shadow-md rounded-xl m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default PropertiesAddPage;
