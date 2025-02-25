import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

interface MapPageProps {
  center?: [number, number]; // center prop'u
  children?: React.ReactNode; // children prop'u
}
const MapPage: React.FC<MapPageProps> = ({ center, children }) => {
  return (
    <MapContainer
      center={center}
      zoom={7}
      style={{ height: '500px', width: '100%', marginTop: '10px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default MapPage;
