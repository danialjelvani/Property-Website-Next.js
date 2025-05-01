import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

const footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-black/40 w-full py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-around px-4">
        <div className="mb-2 md:mb-0">
          <Image src={logo} alt="Logo" className="h-8 w-auto" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentYear} Iran Traditional Rentals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default footer;
