import { useEffect } from "react";
import { useMap } from "react-leaflet";

const windowSize = window.screen.width;
function ResizeMap() {
  const map = useMap();
  useEffect(() => {
    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize]);

  return null;
}
export default ResizeMap;
