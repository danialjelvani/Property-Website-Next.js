"use client";
import React, { useEffect, useState } from "react";

const ScreenInfo = () => {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Avoid hydration error
    setMounted(true);

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted || process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/40 rounded text-teal-200 text-sm w-25 h-5">
      {`W: ${dimensions.width} H: ${dimensions.height}`}
    </div>
  );
};

export default ScreenInfo;
