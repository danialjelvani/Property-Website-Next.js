import React from "react";
import PropertySearchForm from "./propertySearchForm";
import { myFont } from "./fonts";

const hero = () => {
  return (
    <div>
      <section className="linkbuttongreen md:py-20 pt-8 pb-7 [mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <p className="text-xl lg:text-2xl mb-2 text-gray-950">Find the Best at</p>
            <h1 className={`text-7xl tracking-wide ${myFont.className} bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 bg-clip-text text-transparent lg:text-8xl`}>
              Isfahan Rentals
            </h1>
            <p className="mt-4 lg:mt-8 mb-4 lg:mb-8 text-black text-shadow-white text-shadow-[0_0_20px] md:text-xl">
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
