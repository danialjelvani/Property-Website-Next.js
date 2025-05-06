import React, { Suspense } from "react";
import Hero from "@/components/hero";
import InfoBoxes from "@/components/infoBoxes"
import HomeProperties from "@/components/homeProperties"
import LoadingPage from "@/app/loading";

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <Suspense fallback={<LoadingPage />}>
      <HomeProperties />
      </Suspense>
    </>
  );
};

export default HomePage;
