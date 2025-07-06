import React from "react";
import PropertySearchForm from "./propertySearchForm";
const hero = () => {
  return (
    <div>
      <section className="linkbuttongreen md:py-20 pt-8 pb-7 [mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-black font-Title2 text-teal-200 md:text-5xl lg:text-6xl">
              Find The Perfect Rental
            </h1>
            <p className="mt-4 lg:mt-8 mb-2 lg:mb-4 md:text-xl text-sm text-teal-300">
              Discover the perfect property that suits your needs
            </p>
          </div>
          {/*         <!-- Form Component -->
           */}{" "}
          <PropertySearchForm />
        </div>
      </section>
    </div>
  );
};

export default hero;
