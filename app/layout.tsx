import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Isfahan Traditional Rentals",
  description: "find traditional property rentals in Isfahan",
  keywords: ["rental", "apartment", "villa", "cottage", "suite", "Isfahan", "Esfahan", "traditional", "property"],
}

const MainLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <html lang="en">
      <body className="bg-cover bg-fixed bg-no-repeat bg-center bg-gradient-to-b from-neutral-800 via-neutral-700 to-teal-950">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
