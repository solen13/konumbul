'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LocationForm from '@/components/LocationForm/LocationForm';
import { LatLng } from 'leaflet';
interface LocationData {
  id: number;
  name: string;
  position: LatLng;
  iconColor: string;
}

const UpdateLocationPageContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [initialData, setInitialData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLocations = JSON.parse(
      localStorage.getItem('locations') || '[]'
    );
    setLocations(savedLocations);

    if (id) {
      const locationToEdit = savedLocations.find(
        (loc: LocationData) => loc.id === Number(id)
      );

      if (locationToEdit) {
        setInitialData(locationToEdit);
      }
    }
    setIsLoading(false);
  }, [id]);

  const handleSave = (updatedLocation: LocationData) => {
    const updatedLocations = locations.map((loc) =>
      loc.id === updatedLocation.id ? updatedLocation : loc
    );
    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!initialData) {
    return <div>Location not found!</div>;
  }

  return (
    <div>
      <LocationForm initialData={initialData} onSave={handleSave} />
    </div>
  );
};

// Suspense ile sarma
export default function UpdateLocationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateLocationPageContent />
    </Suspense>
  );
}
