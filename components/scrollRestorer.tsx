"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollRestorer = () => {
  const pathname = usePathname();
  // Save the scroll position when the page is being unloaded (before navigation)
  useEffect(() => {
    // Check if client-side
    if (typeof window !== "undefined") {
      // Save the scroll position before the page is unloaded
      const handleBeforeUnload = () => {
        sessionStorage.setItem("scrollPosition", window.scrollY.toString());
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

  useEffect(() => {
    // On page load (client-side), scroll to the saved position if it exists
    if (typeof window !== "undefined") {
      const scrollPosition = sessionStorage.getItem("scrollPosition");
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
      }
    }
  }, [pathname]);

  return null;
};

export default ScrollRestorer;
