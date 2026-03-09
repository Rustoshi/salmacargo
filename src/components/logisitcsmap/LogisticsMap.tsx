"use client";

import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const LogisticsMap = ({ coordinates }:{coordinates:[number,number][]}) => {
  const defaultCenter:any = coordinates.length > 0 ? coordinates[0] : [6.5244, 3.3792]; // Default: Lagos, Nigeria
  const polylineOptions = { color: "blue", weight: 5 };

  const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer center={defaultCenter} zoom={10} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
        {coordinates.map((position, index) => (
        <Marker key={index} position={position} icon={customIcon}>
          <Popup>Stop {index + 1}: {position[0]}, {position[1]}</Popup>
        </Marker>
      ))}
      {coordinates.length > 1 && <Polyline positions={coordinates} pathOptions={polylineOptions} />}
    </MapContainer>
  );
};

export default LogisticsMap;
