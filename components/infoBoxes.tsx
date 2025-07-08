import React from "react";
import InfoBox from "@/components/infoBox";

const infoBoxes = () => {
  return (
    <div>
      <section>
        <div className="container-xl -mt-8 -mb-4 lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <InfoBox
              title="For Renters"
              backgroundColor="linkbuttonneutral"
              textColor="text-emerald-100"
              buttonInfo={{
                backgroundColor: "linkbuttonneutral2",
                textColor: "text-white",
                link: "/properties",
                text: "Browse Properties",
              }}
            >
              Find your dream rental property. Bookmark properties and contact
              owners.
            </InfoBox>

            <InfoBox
              textColor="text-white"
              backgroundColor="linkbuttonslate2"
              title="For Property Owners"
              buttonInfo={{
                backgroundColor: "linkbuttonslate",
                textColor: "text-white",
                link: "/properties/add",
                text: "Add Property",
              }}
            >
              List your properties and reach potential tenants. Rent as an
              airbnb or long term.
            </InfoBox>
          </div>
        </div>
      </section>
    </div>
  );
};

export default infoBoxes;
