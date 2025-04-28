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
      className={`${backgroundColor} ${textColor} p-6 rounded-lg shadow-[0_0_30px] shadow-neutral-800`}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <Link
        href={buttonInfo.link}
        className={`inline-block min-w-41 text-center ${buttonInfo.backgroundColor} ${buttonInfo.textColor} rounded-lg px-4 py-2`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default infoBox;
