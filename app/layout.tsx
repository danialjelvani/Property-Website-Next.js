import React from "react";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "Property Website",
  description: "find rental",
  keywords: ["rental", "apartment", "villa", "cottage", "suite"],
}

const MainLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
