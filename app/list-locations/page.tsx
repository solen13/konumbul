'use client';

import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  Flex,
  Button,
  Text,
  Container,
} from '@chakra-ui/react';
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

  useEffect(() => {
    const locations = JSON.parse(localStorage.getItem('locations') || '[]');
    setSavedLocations(locations);
  }, []);

  const handleViewDetails = (id: number) => {
    router.push(`/update-locations?id=${id}`);
  };

  return (
    <Container>
      <Text fontSize="2xl" fontWeight="bold" marginBottom="20px">
        Saved Locations
      </Text>

      <List.Root>
        {savedLocations.map((location) => (
          <ListItem key={location.id} mt="3" listStyleType="none">
            <Flex alignItems="center" justifyContent="space-between">
              <Flex alignItems="center">
                <svg
                  viewBox="0 0 26 36"
                  width="20px"
                  height="20px"
                  style={{ marginRight: '10px' }}
                >
                  <path
                    style={{
                      fill: location.iconColor,
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
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => handleViewDetails(location.id)}
              >
                Update
              </Button>
            </Flex>
          </ListItem>
        ))}
      </List.Root>
    </Container>
  );
};

export default LocationsListPage;
