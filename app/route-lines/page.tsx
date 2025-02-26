'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Button, Container, Flex } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
const Map = dynamic(
  () => import('@/components/map/map').then((mod) => mod.default),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});
const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
);

interface Location {
  id: number;
  name: string;
  position: { lat: number; lng: number };
  iconColor: string;
}

export default function MapPage() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [L, setL] = useState<typeof import('leaflet') | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLocations = localStorage.getItem('locations');
      if (storedLocations) {
        setLocations(JSON.parse(storedLocations));
      }

      import('leaflet').then((leaflet) => {
        setL(leaflet.default || leaflet);
        import('leaflet/dist/leaflet.css');
      });
    }
  }, []);

  if (!L) {
    return null;
  }
  const getCenter = (): [number, number] => {
    if (userLocation) {
      return [userLocation.lat, userLocation.lng];
    } else if (sortedLocations[1]) {
      return [sortedLocations[1].position.lat, sortedLocations[1].position.lng];
    } else {
      return [41.0082, 28.9784];
    }
  };

  const sortedLocations = userLocation
    ? [...locations].sort((a, b) => {
        const distanceA = L.latLng(userLocation).distanceTo(
          L.latLng(a.position)
        );
        const distanceB = L.latLng(userLocation).distanceTo(
          L.latLng(b.position)
        );
        return distanceA - distanceB;
      })
    : locations;

  const routeLine: [number, number][] = userLocation
    ? [
        [userLocation.lat, userLocation.lng],
        ...sortedLocations.map(
          (loc) => [loc.position.lat, loc.position.lng] as [number, number]
        ),
      ]
    : sortedLocations.map(
        (loc) => [loc.position.lat, loc.position.lng] as [number, number]
      );

  const center = getCenter();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Konum alınamadı:', error);
        }
      );
    } else {
      console.error('Tarayıcınız konum servisini desteklemiyor.');
    }
  };

  return (
    <Container>
      <Map center={center}>
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={
              new L.Icon({
                iconUrl: 'https://ahlat-sehirici.netlify.app/human.png',
                iconSize: [30, 36],
                iconAnchor: [15, 36],
                popupAnchor: [0, -36],
              })
            }
          >
            <Popup>Mevcut Konumunuz</Popup>
          </Marker>
        )}
        {sortedLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.position.lat, location.position.lng]}
            icon={
              new L.DivIcon({
                className: 'custom-div-icon',
                html: `<svg viewBox="0 0 26 36">
                      <path style="fill:${location.iconColor}; stroke:black; vector-effect: non-scaling-stroke"
                            d='M13,36C5.4,28.4,0,20.2,0,13S5.8,0,13,0s13,5.8,13,13S20.6,28.4,13,36z' />
                      <circle style="fill:white" cx='13' cy='13' r='9' />
                    </svg>`,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
              })
            }
          >
            {userLocation && (
              <Popup>
                <div>
                  <h3>{location.name}</h3>
                  <p>Enlem: {location.position.lat}</p>
                  <p>Boylam: {location.position.lng}</p>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
        {userLocation && <Polyline positions={routeLine} color="purple" />}
      </Map>
      <Flex alignItems="center" justifyContent="center" mt="6">
        <Button onClick={getUserLocation}>
          Location <FaMapMarkerAlt />
        </Button>
      </Flex>
    </Container>
  );
}
