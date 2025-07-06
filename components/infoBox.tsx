import React, { ReactNode } from "react";
import Link from "next/link";
interface IinfoBoxProps {
  title?: string;
  backgroundColor: string;
  textColor: string;
  buttonInfo: {
    backgroundColor: string;
    textColor: string;
    link: string;
    text: string;
  };
  children?: ReactNode;
}
const infoBox = ({
  title,
  backgroundColor,
  textColor,
  buttonInfo,
  children,
}: IinfoBoxProps) => {
  return (
    <div
      className={`${backgroundColor} ${textColor} px-6 py-4 text-sm md:text-base rounded-lg shadow-[0_0_30px] shadow-neutral-800`}
    >
      <h2 className="md:text-2xl text-xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <Link
        href={buttonInfo.link}
        className={`md:inline-block block min-w-41 text-center ${buttonInfo.backgroundColor} ${buttonInfo.textColor} rounded-lg px-4 py-1 h-8 md:py-2 md:h-10`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default infoBox;
