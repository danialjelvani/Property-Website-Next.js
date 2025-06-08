"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import ResizeMap from "./resizeMap";

export const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({
  onSelect,
}: {
  onSelect: (coords: { lat: number; lng: number }) => void;
}) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

export default function LocationPicker({
  onLocationSelect,
}: {
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
}) {
  return (
    <div className="h-100 w-full p-4 rounded flex flex-col overflow-hidden border border-black saturate-200 ">
      <p className="text-center -mt-1 mb-2 text-sm md:text-base">
        Pin the location of property by clicking on the map
      </p>
      <MapContainer
        center={[32.6539, 51.666]}
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
        <LocationMarker onSelect={onLocationSelect} />
        <ResizeMap />
      </MapContainer>
    </div>
  );
}
