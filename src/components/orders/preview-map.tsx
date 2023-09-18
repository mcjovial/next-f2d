import React, { FC, useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

interface Addr {
  lat: string;
  lng: string;
}
type Props = {
  origin: Addr;
  destination: Addr;
  setDistance: (arg: any) => void;
};

const DeliveryPreview: FC<Props> = ({origin, destination, setDistance}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
  });

  const [directions, setDirections] = useState<any>(null);

  // Sample coordinates (you can replace these with your actual coordinates)


  useEffect(() => {
    if (isLoaded) {
      const directionsService = new google.maps.DirectionsService();

      // Create a request object for the directions
      const request = {
        origin: new google.maps.LatLng(
          parseFloat(origin.lat),
          parseFloat(origin.lng)
        ),
        destination: new google.maps.LatLng(
          parseFloat(destination.lat),
          parseFloat(destination.lng)
        ),
        travelMode: google.maps.TravelMode.DRIVING,
      };

      // Clear previous directions
      setDirections(null);

      // Request directions and calculate distance
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);

          // Calculate the distance
          const route = result?.routes[0];
          let totalDistance = 0;
          for (const leg of route?.legs) {
            totalDistance += leg?.distance?.value;
          }
          // Convert meters to kilometers
          const distanceInKilometers = totalDistance / 1000;
          setDistance(distanceInKilometers.toFixed(2) + 'km');
        }
      });
      // directionsService.route(
      //   {
      //     origin: new google.maps.LatLng(
      //       parseFloat(origin.lat),
      //       parseFloat(origin.lng)
      //     ),
      //     destination: new google.maps.LatLng(
      //       parseFloat(destination.lat),
      //       parseFloat(destination.lng)
      //     ),
      //     travelMode: google.maps.TravelMode.DRIVING,
      //   },
      //   (result, status) => {
      //     if (status === google.maps.DirectionsStatus.OK) {
      //       setDirections(null);
      //       setDirections(result);
      //       // Extract and set the distance
      //       const route = result?.routes[0];
      //       if (route && route.legs.length > 0) {
      //         setDistance(route?.legs[0]?.distance?.text);
      //       }
      //     }
      //   }
      // );
    }
  }, [isLoaded, destination, origin]);

  return (
    <>
      <div className='w-full mt-8 border-3 border-white'>
        <div style={{ height: '500px', width: '100%' }}>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ height: '100%', width: '100%' }}
              center={{
                lat: parseFloat(origin.lat),
                lng: parseFloat(origin.lng),
              }}
              zoom={15} // Adjust the zoom level as needed
            >
              {/* Render the directions */}
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    polylineOptions: {
                      strokeColor: 'blue', // You can set different colors here
                    },
                  }}
                />
              )}
            </GoogleMap>
          ) : (
            <div>Loading Google Maps...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeliveryPreview;
