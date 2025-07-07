import React from "react";
import { fetchProperties } from "@/utils/requests";
import FeaturedPropertiesScroll from "./featuredPropertiesScroll";
import { myFont } from "./fonts";

const FeaturedProperties = async () => {
  const properties = await fetchProperties({ showFeatured: true });
  if (!properties) {
    return (
      <div className="text-center text-white">Error loading featured properties</div>
    );
  }
  const randomProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 5);

  return (
    properties.length > 0 && (
      <section className="pt-6 pb-10">
        <div className="linkbuttonsky2 py-2 container-xl lg:container m-auto">
          <h2 className={`xl:text-4xl text-3xl ${myFont.className} tracking-wider bg-gradient-to-b from-sky-950 via-sky-950 to-sky-900 bg-clip-text text-transparent mt-6 mb-5 lg:mb-7 text-center`}>
            Featured Properties
          </h2>
          <FeaturedPropertiesScroll properties={randomProperties} />
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;
