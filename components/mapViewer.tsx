"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import ResizeMap from "./resizeMap";

export const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapViewer({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div className="h-80 w-full rounded flex flex-col overflow-hidden saturate-200 ">
      <MapContainer
        center={[lat, lng]}
        zoom={12}
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          borderRadius: "7px",
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Marker position={{ lat, lng }} icon={markerIcon} />
        <ResizeMap />
      </MapContainer>
    </div>
  );
}
