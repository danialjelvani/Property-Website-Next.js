import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AuthProvider from "@/components/authProvider";
import { Slide, ToastContainer } from "react-toastify";
import "leaflet/dist/leaflet.css";
import { MessageProvider } from "@/context/messageContext";
import "photoswipe/dist/photoswipe.css";
import ScreenInfo from "@/components/screenInfo";

export const metadata = {
  title: "Isfahan Rentals",
  description: "find property rentals in Isfahan",
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
        <body className="bg11">
          <MessageProvider>
            <ScreenInfo />
            <div className="relative z-10 min-h-screen flex flex-col text-white">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <ToastContainer
                transition={Slide}
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </div>
          </MessageProvider>
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
