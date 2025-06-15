import React from "react";
import { fetchProperties } from "@/utils/requests";
import FeaturedPropertiesScroll from "./featuredPropertiesScroll";

const FeaturedProperties = async () => {
  const properties = await fetchProperties({ showFeatured: true });
  const randomProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 5);

  return (
    properties.length > 0 && (
      <section className="pt-6 pb-10">
        <div className="linkbuttonteal py-2 container-xl lg:container m-auto">
          <h2 className="xl:text-4xl lg:text-3xl text-2xl text-shadow-[0_0_2px] text-shadow-white font-Title2 tracking-wider font-extrabold text-teal-300 mt-6 mb-8 text-center">
            Featured Properties
          </h2>
          <FeaturedPropertiesScroll properties={randomProperties} />
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;
