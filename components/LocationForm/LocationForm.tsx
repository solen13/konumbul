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

interface LocationFormProps {
  initialData?: LocationData; // Güncelleme için mevcut lokasyon verisi
  onSave: (newLocation: LocationData) => void; // Kaydetme veya güncelleme işlemi
}

const LocationForm: React.FC<LocationFormProps> = ({ onSave, initialData }) => {
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(
    initialData?.position || null
  );
  const [L, setL] = useState<typeof import('leaflet') | null>(null);
  const [locationName, setLocationName] = useState<string>(
    initialData?.name || ''
  );
  const [iconColor, setIconColor] = useState<string>(
    initialData?.iconColor || '#000000'
  );
  const [locations, setLocations] = useState<LocationData[]>([]);

  useEffect(() => {
    // Leaflet kütüphanesini ve CSS dosyasını yalnızca istemci tarafında yükle
    import('leaflet').then((leaflet) => {
      setL(leaflet.default || leaflet); // `default` özelliğini kontrol et
      import('leaflet/dist/leaflet.css');
    });

    // localStorage'dan kayıtlı lokasyonları yükle
    const savedLocations = localStorage.getItem('locations');
    if (savedLocations) {
      setLocations(JSON.parse(savedLocations)); // Veriyi almak için null kontrolü yapılmalı
    }
  }, []);

  useEffect(() => {
    // locations değiştiğinde localStorage'ı güncelle
    if (locations.length > 0) {
      localStorage.setItem('locations', JSON.stringify(locations));
    }
  }, [locations]); // locations state'i değiştiğinde çalışacak

  const handleDragEnd = (e: LeafletEvent) => {
    const position: LatLng = e.target.getLatLng();
    setMarkerPosition(position);
  };

  const handleSaveLocation = () => {
    if (!markerPosition || !locationName) return;

    const newLocation: LocationData = {
      id: initialData?.id || Date.now(), // Güncelleme modunda mevcut ID'yi kullan, yoksa yeni ID oluştur
      name: locationName,
      position: markerPosition,
      iconColor: iconColor,
    };

    let updatedLocations: LocationData[];
    if (initialData) {
      // Güncelleme modu
      updatedLocations = locations.map((loc) =>
        loc.id === initialData.id ? newLocation : loc
      );
    } else {
      // Yeni ekleme modu
      updatedLocations = [...locations, newLocation];
      // Yeni ekleme modunda inputları sıfırla
      setLocationName('');
      setIconColor('#000000');
    }

    setLocations(updatedLocations); // Updated locations state'ini ayarla
    // Üst bileşene yeni lokasyonu ilet
    onSave(newLocation);
  };

  if (!L) {
    return null; // Leaflet yüklenene kadar bir şey gösterme
  }

  const center: [number, number] = markerPosition
    ? [markerPosition.lat, markerPosition.lng]
    : [41.0082, 28.9784];

  return (
    <div>
      <Map center={center}>
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
          <Button onClick={handleSaveLocation}>
            {initialData ? 'Update Location' : 'Save Location'}
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default LocationForm;
