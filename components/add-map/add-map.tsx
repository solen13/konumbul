'use client'; // Bu sayfanın istemci tarafında çalışacağını belirtir
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Input, Button, Box, Flex } from '@chakra-ui/react';
import L, { LeafletEvent, LatLng } from 'leaflet';
import Map from '@/components/map/map';
// Bileşenleri dinamik olarak yükle (SSR'yi devre dışı bırak)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

interface LocationData {
  id: number;
  name: string;
  position: LatLng;
  iconColor: string;
}

const ParentComponent = () => {
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const [L, setL] = useState<typeof import('leaflet') | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [iconColor, setIconColor] = useState<string>('#000000');
  const [locations, setLocations] = useState<LocationData[]>([]);

  useEffect(() => {
    // Leaflet kütüphanesini ve CSS dosyasını yalnızca istemci tarafında yükle
    import('leaflet').then((leaflet) => {
      setL(leaflet.default || leaflet); // `default` özelliğini kontrol et
      import('leaflet/dist/leaflet.css');
    });

    // localStorage'dan kayıtlı lokasyonları yükle
    const savedLocations = JSON.parse(
      localStorage.getItem('locations') || '[]'
    );
    setLocations(savedLocations);
  }, []);

  useEffect(() => {
    if (markerPosition) {
      console.log('Marker Position:', markerPosition);
    }
  }, [markerPosition]);

  const handleDragEnd = (e: LeafletEvent) => {
    const position: LatLng = e.target.getLatLng();
    setMarkerPosition(position);
  };

  const handleSaveLocation = () => {
    if (!markerPosition || !locationName) return;

    const newLocation: LocationData = {
      id: Date.now(), // Benzersiz bir ID oluştur
      name: locationName,
      position: markerPosition,
      iconColor: iconColor,
    };

    const updatedLocations = [...locations, newLocation];
    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));

    // Inputları sıfırla
    setLocationName('');
    setIconColor('#000000');
  };

  if (!L) {
    return null; // Leaflet yüklenene kadar bir şey gösterme
  }

  return (
    <div>
      <Map>
        <Marker
          position={markerPosition || [41.0082, 28.9784]}
          eventHandlers={{
            dragend: handleDragEnd, // Marker'ın sürüklendiğinde konumu değiştirecek fonksiyon
          }}
          icon={
            new L.DivIcon({
              className: 'custom-div-icon',
              html: `<svg viewBox="0 0 26 36">
                  <path style="fill:${iconColor}; stroke:black; vector-effect: non-scaling-stroke"
                        d='M13,36C5.4,28.4,0,20.2,0,13S5.8,0,13,0s13,5.8,13,13S20.6,28.4,13,36z' />
                  <circle style="fill:white" cx='13' cy='13' r='9' />
                </svg>`,
              iconSize: [30, 30],
              iconAnchor: [15, 30],
              popupAnchor: [0, -30],
            })
          }
          draggable={true}
        >
          {markerPosition && (
            <Popup>
              <strong>Lat: {markerPosition.lat.toFixed(4)}</strong>
              <br />
              <strong>Lng: {markerPosition.lng.toFixed(4)}</strong>
            </Popup>
          )}
        </Marker>
      </Map>

      <Box marginTop="10px">
        <Flex gap="10px" alignItems="center">
          <Input
            placeholder="Location Name"
            size="lg"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
          <Input
            type="color"
            size="lg"
            width="80px"
            value={iconColor}
            onChange={(e) => setIconColor(e.target.value)}
          />
          <Button onClick={handleSaveLocation}>Save Location</Button>
        </Flex>
      </Box>
    </div>
  );
};

export default ParentComponent;
