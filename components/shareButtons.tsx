import React from "react";
import {
  EmailShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import { FaShare } from "react-icons/fa";
import { Iproperty } from "@/components/PropertyCard";

const ShareButtons = ({ property }: { property: Iproperty }) => {
  if (!property) return null;
  const shareURL = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <div className="linkbuttonslate flex flex-col gap-3 p-2 rounded-lg">
        <h3 className="text-center text-lg font-bold text-white">
          Share This Property
        </h3>
        <div className="flex gap-6 justify-center mb-1">
          <EmailShareButton
            url={shareURL}
            children={<EmailIcon size={32} round />}
            subject={property.name}
            body={"i want to share this property with you and you can contact me for more details "}
            separator=" | "
          ></EmailShareButton>
          <TwitterShareButton
            url={shareURL}
            children={<TwitterIcon size={32} round />}
            title={property.name}
            hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
          ></TwitterShareButton>
          <WhatsappShareButton
            url={shareURL}
            children={<WhatsappIcon size={32} round />}
            title={property.name}
            separator=" | "
          ></WhatsappShareButton>
          <TelegramShareButton
            url={shareURL}
            children={<TelegramIcon size={32} round />}
            title={property.name}
          ></TelegramShareButton>
        </div>
      </div>
    </>
  );
};

export default ShareButtons;
