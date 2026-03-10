"use client";

import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icons in Leaflet when used with Next.js/Webpack
const DefaultIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map view changes reactively
function MapUpdater({ coordinates }: { coordinates: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length > 0) {
      // Filter out [0, 0] if they are fallbacks
      const validCoords = coordinates.filter(c => c[0] !== 0 || c[1] !== 0);

      if (validCoords.length > 0) {
        const bounds = L.latLngBounds(validCoords);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      }
    }
  }, [coordinates, map]);

  return null;
}

const LogisticsMap = ({ coordinates }: { coordinates: [number, number][] }) => {
  const defaultCenter: [number, number] = [6.5244, 3.3792]; // Lagos, Nigeria

  return (
    <MapContainer
      center={defaultCenter}
      zoom={10}
      style={{ height: "500px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <MapUpdater coordinates={coordinates} />

      {coordinates.map((position, index) => {
        // Skip rendering [0, 0] markers to avoid cluttering Atlantic Ocean
        if (position[0] === 0 && position[1] === 0) return null;

        return (
          <Marker key={index} position={position}>
            <Popup>
              <div className="text-sm">
                <strong>Stop {index + 1}</strong><br />
                Lat: {position[0].toFixed(4)}<br />
                Lon: {position[1].toFixed(4)}
              </div>
            </Popup>
          </Marker>
        );
      })}

      {coordinates.length > 1 && (
        <Polyline
          positions={coordinates.filter(c => c[0] !== 0 || c[1] !== 0)}
          pathOptions={{ color: "var(--primary, #3b82f6)", weight: 4, dashArray: '10, 10' }}
        />
      )}
    </MapContainer>
  );
};

export default LogisticsMap;
