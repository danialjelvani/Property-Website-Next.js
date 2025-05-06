import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Isfahan Traditional Rentals",
  description: "find traditional property rentals in Isfahan",
  keywords: [
    "rental",
    "apartment",
    "villa",
    "cottage",
    "suite",
    "Isfahan",
    "Esfahan",
    "traditional",
    "property",
  ],
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className="absolute inset-0 bg-cover bg-fixed bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/images/background.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/70 via-neutral-800/60 to-neutral-800/40 opacity-80"></div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default MainLayout;
