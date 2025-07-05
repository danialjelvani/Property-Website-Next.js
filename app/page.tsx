import React, { Suspense } from "react";
import Hero from "@/components/hero";
import InfoBoxes from "@/components/infoBoxes";
import HomeProperties from "@/components/homeProperties";
import LoadingPage from "@/app/loading";
import FeaturedProperties from "@/components/featuredProperties";

export const dynamic = 'force-dynamic';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <Suspense fallback={<LoadingPage />}>
        <FeaturedProperties />
        <HomeProperties />
      </Suspense>
    </>
  );
};

export default HomePage;
