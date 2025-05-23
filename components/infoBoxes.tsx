import React from "react";
import InfoBox from "@/components/infoBox";

const infoBoxes = () => {
  return (
    <div>
      <section>
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <InfoBox
              title="For Renters"
              backgroundColor="bg-black/60"
              textColor="text-emerald-200"
              buttonInfo={{
                backgroundColor: "linkbuttonemerald",
                textColor: "text-white",
                link: "/properties",
                text: "Browse Properties",
              }}
            >
              Find your dream rental property. Bookmark properties and contact
              owners.
            </InfoBox>

            <InfoBox
              textColor="text-slate-100"
              backgroundColor="bg-stone-900/70"
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
