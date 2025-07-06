import React from "react";
import { fetchProperties } from "@/utils/requests";
import FeaturedPropertiesScroll from "./featuredPropertiesScroll";

const FeaturedProperties = async () => {
  const properties = await fetchProperties({ showFeatured: true });
  if (!properties) {
    return (
      <div className="text-center text-teal-200">Error loading featured properties</div>
    );
  }
  const randomProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 5);

  return (
    properties.length > 0 && (
      <section className="pt-6 pb-10">
        <div className="linkbuttonteal py-2 container-xl lg:container m-auto">
          <h2 className="xl:text-4xl text-3xl font-Title2 tracking-wider font-extrabold text-teal-300 mt-6 mb-8 text-center">
            Featured Properties
          </h2>
          <FeaturedPropertiesScroll properties={randomProperties} />
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;
