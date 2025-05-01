import React from "react";
import Hero from "@/components/hero";
import InfoBoxes from "@/components/infoBoxes"
import PropertiesPage from "@/components/homeProperties"

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <PropertiesPage />
    </>
  );
};

export default HomePage;
