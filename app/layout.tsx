import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AuthProvider from "@/components/authProvider";
import { ToastContainer } from "react-toastify";

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
    <AuthProvider>
      <html lang="en">
        <body
          className="absolute inset-0 bg-cover bg-fixed bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/images/background.png')" }}
        >
          <div className="fixed inset-0 bg-gradient-to-b from-neutral-800/70 via-neutral-800/60 to-neutral-800/40 opacity-80"></div>

          <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ToastContainer />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
