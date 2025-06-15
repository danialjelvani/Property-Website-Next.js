"use client";

import { useEffect, useRef } from "react";
import FeaturedPropertyCard from "./featuredPropertyCard";
import { Iproperty } from "./PropertyCard";

interface Props {
  properties: Iproperty[];
}

export default function FeaturedPropertiesScroll({ properties }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const middleChildRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current && middleChildRef.current) {
      const parent = parentRef.current;
      const child = middleChildRef.current;

      const childOffsetLeft = child.offsetLeft;
      const scrollTo =
        childOffsetLeft - parent.clientWidth / 2 + child.clientWidth / 2;

      parent.scrollTo({
        left: scrollTo,
        behavior: "auto",
      });
    }
  }, []);

  return (
    <div
      ref={parentRef}
      className="overflow-x-auto scrollbar snap-x snap-mandatory h-140 w-full px-6 py-2 flex gap-2"
    >
      {properties.map((property, index) => (
        <div
          key={property._id}
          ref={index === 2 ? middleChildRef : null} // scroll to index 2
          className="px-4 shrink-0 w-full md:w-1/2 lg:w-1/3 snap-center"
        >
          <FeaturedPropertyCard property={property} />
        </div>
      ))}
    </div>
  );
}
