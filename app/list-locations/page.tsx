'use client'; // Bu sayfanın bir Client Component olduğunu belirtir

import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Flex, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface LocationData {
  id: number;
  name: string;
  position: { lat: number; lng: number };
  iconColor: string;
}

const LocationsListPage: React.FC = () => {
  const router = useRouter();
  const [savedLocations, setSavedLocations] = useState<LocationData[]>([]);

  // localStorage'dan kayıtlı lokasyonları al (yalnızca istemci tarafında)
  useEffect(() => {
    const locations = JSON.parse(localStorage.getItem('locations') || '[]');
    setSavedLocations(locations);
  }, []);

  // Detay sayfasına yönlendirme
  const handleViewDetails = (id: number) => {
    router.push(`/update-locations?id=${id}`);
  };

  return (
    <Box padding="20px">
      <Text fontSize="2xl" fontWeight="bold" marginBottom="20px">
        Kayıtlı Lokasyonlar
      </Text>
      <List.Root>
        {savedLocations.map((location) => (
          <ListItem key={location.id}>
            <Flex alignItems="center" justifyContent="space-between">
              <Flex alignItems="center">
                {/* Lokasyon ikonu */}

                <svg
                  viewBox="0 0 26 36"
                  width="20px" // SVG genişliği
                  height="20px" // SVG yüksekliği
                  style={{ marginRight: '10px' }} // Sağdan boşluk
                >
                  <path
                    style={{
                      fill: location.iconColor, // Dinamik renk
                      stroke: 'black',
                      vectorEffect: 'non-scaling-stroke',
                    }}
                    d="M13,36C5.4,28.4,0,20.2,0,13S5.8,0,13,0s13,5.8,13,13S20.6,28.4,13,36z"
                  />
                  <circle style={{ fill: 'white' }} cx="13" cy="13" r="9" />
                </svg>
                <Text>
                  {location.name} (Lat: {location.position.lat.toFixed(4)}, Lng:{' '}
                  {location.position.lng.toFixed(4)})
                </Text>
              </Flex>
              {/* Detay butonu */}
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => handleViewDetails(location.id)}
              >
                Detay
              </Button>
            </Flex>
          </ListItem>
        ))}
      </List.Root>
    </Box>
  );
};

export default LocationsListPage;
