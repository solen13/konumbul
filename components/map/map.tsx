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
  children?: ReactNode;
}

const MapPage: React.FC<MapPageProps> = ({ children }) => {
  return (
    <MapContainer
      center={[41.0082, 28.9784]}
      zoom={13}
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
