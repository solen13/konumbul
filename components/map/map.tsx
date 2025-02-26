import React from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Container } from '@chakra-ui/react';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

interface MapPageProps {
  center?: [number, number];
  children?: React.ReactNode;
}
const MapPage: React.FC<MapPageProps> = ({ center, children }) => {
  return (
    <Container>
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: '500px', width: '100%', marginTop: '10px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </Container>
  );
};

export default MapPage;
