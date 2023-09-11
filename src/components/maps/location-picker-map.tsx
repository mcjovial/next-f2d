import React from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  GoogleMapProps,
} from 'react-google-maps';

interface LocationPickerMapProps extends GoogleMapProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  defaultLat: number;
  defaultLng: number;
}

const LocationPickerMap = withScriptjs(
  withGoogleMap(({ onLocationSelect, defaultLat, defaultLng }: LocationPickerMapProps) => {
    const handleMapClick = (e: google.maps.MouseEvent) => {
      const { lat, lng } = e.latLng!.toJSON();
      onLocationSelect({ lat, lng });
    };

    return (
      <GoogleMap
        defaultZoom={8}
        // defaultCenter={{ lat: defaultLat, lng: defaultLng }}
        center={{ lat: Number(defaultLat), lng: Number(defaultLng) }}
        onClick={handleMapClick}
      >
        {/* Optional: You can display a marker to show the default location */}
        <Marker position={{ lat: Number(defaultLat), lng: Number(defaultLng) }} />
      </GoogleMap>
    );
  })
);

export default LocationPickerMap;
