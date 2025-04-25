import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Property Website",
  description: "find rental",
  keywords: ["rental", "apartment", "villa", "cottage", "suite"],
}

const MainLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
