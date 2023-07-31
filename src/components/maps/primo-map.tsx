import LocationPickerMap from '@/components/maps/location-picker-map';
import useGeolocation from '@/lib/hooks/use-geolocation';
import axios from 'axios';
import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface Props {
  onSubmit?: (arg: Record<any, any>) => void
  defaultValues?: {
    lat: number;
    lng: number;
    title: string;
  }
}

const PrimoMap: React.FC<Props> = ({onSubmit, defaultValues}) => {
  const { location, country } = useGeolocation();
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Coordinates>({ lat: 0, lng: 0 });
  const [address, setAddress] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  console.log('add', defaultValues);

  useEffect(() => {
    if (defaultValues?.lat && defaultValues.lng) {
      setSelectedLocation({ lat: defaultValues.lat, lng: defaultValues.lng });
      reverseGeocode(defaultValues.lat, defaultValues.lng);
      setTitle(defaultValues.title);
    } else {
      setSelectedLocation({ lat: location.lat, lng: location.lng });
      reverseGeocode(location.lat, location.lng);
    }
  }, [location]);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
      );
      if (response.data && response.data.results.length > 0) {
        setAddress(response.data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error fetching address:', error.message);
    }
  };

  const handleLocationSelect = (location: Coordinates) => {
    setSelectedLocation(location);
    reverseGeocode(location.lat, location.lng);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedLocation((prevState) => ({
      ...prevState,
      [name]: parseFloat(value), // Convert the input value to a float
    }));
  };

  useEffect(() => {
    reverseGeocode(selectedLocation.lat, selectedLocation.lng);
  }, [selectedLocation]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mapRef.current && mapRef.current.panTo) {
      const { lat, lng } = selectedLocation;
      const newPosition = new window.google.maps.LatLng(lat, lng);
      mapRef.current.panTo(newPosition);
    }
    // Call the reverse geocoding function to get the address
    reverseGeocode(selectedLocation.lat, selectedLocation.lng);
    if (onsubmit) {
      onSubmit({ selectedLocation, address, title, country });
    }
  };  
  
  return (
    <div className='w-full'>
      <div style={{ height: '500px', width: '100%' }}>
        <LocationPickerMap
          ref={mapRef}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onLocationSelect={handleLocationSelect}
          defaultLat={selectedLocation.lat}
          defaultLng={selectedLocation.lng}
        />
      </div>

      <div className="flex justify-center px-2">
        <div className="mt-10 w-full space-y-3">
          <div className="flex">
            <p className="w-48">Address</p>
            <p className="w-full rounded-md border p-2">{address}</p>
          </div>
          <form onSubmit={handleFormSubmit} className="w-full space-y-3">
            {onSubmit && <label className="flex items-center gap-x-5">
              <span className="w-48">Title:</span>
              <input
                className="placeholder:text-gray_500 focus:ring-accent block w-full rounded-md border-0 px-3.5 py-2 text-base text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-sm focus:outline-0 focus:ring-2 focus:ring-inset"
                type="text"
                name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
            </label>}
            <label className="flex items-center gap-x-5">
              <span className="w-48">Latitude:</span>
              <input
                className="placeholder:text-gray_500 focus:ring-accent block w-full rounded-md border-0 px-3.5 py-2 text-base text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-sm focus:outline-0 focus:ring-2 focus:ring-inset"
                type="number"
                name="lat"
                value={selectedLocation.lat}
                onChange={handleInputChange}
              />
            </label>
            <label className="flex items-center gap-x-5">
              <span className="w-48">Longitude:</span>
              <input
                className="placeholder:text-gray_500 focus:ring-accent block w-full rounded-md border-0 px-3.5 py-2 text-base text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-sm focus:outline-0 focus:ring-2 focus:ring-inset"
                type="number"
                name="lng"
                value={selectedLocation.lng}
                onChange={handleInputChange}
              />
            </label>
            <div className="flex justify-end">
              <button className="rounded bg-accent hover:bg-amber-500 py-2 px-4 text-white" type="submit">
                {onSubmit ? 'Update Map': 'Check'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrimoMap;
