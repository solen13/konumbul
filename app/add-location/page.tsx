'use client';
import { useEffect, useState } from 'react';

import LocationForm from '@/components/LocationForm/LocationForm';
interface LocationData {
  id: number;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  iconColor: string;
}

export default function AddLocation() {
  const [locations, setLocations] = useState<LocationData[]>([]);

  const handleSave = (newLocation: LocationData) => {
    const updatedLocations = [...locations, newLocation];

    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
  };

  return (
    <div>
      <LocationForm onSave={handleSave} />
    </div>
  );
}
