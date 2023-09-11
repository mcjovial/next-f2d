import { useEffect, useState } from 'react';
import axios from 'axios';
import { CountryData } from '@/types';

interface Coordinates {
  lat: number;
  lng: number;
}

const useGeolocation = (): { country: string | undefined; currency: string; location: Coordinates } => {
  const [location, setLocation] = useState<Coordinates>({ lat: 0, lng: 0 });
  const [country, setCountry] = useState<string | undefined>();
  const [currency, setCurrency] = useState<string>('Unknown Currency');

  useEffect(() => {
    const fetchGeolocationData = async () => {
      try {
        const geolocationApiResponse = await axios.post(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
        );
        const { lat, lng } = geolocationApiResponse.data.location;        
        setLocation({ lat, lng });

        // Call the reverse geocoding function to get the country
        const countryData = await reverseGeocode(lat, lng);
        setCountry(countryData.name);
        setCurrency(Object.keys(countryData.currencies)[0]);
      } catch (error: any) {
        console.error('Error fetching geolocation data:', error.message);
      }
    };

    fetchGeolocationData();
  }, []);

  const reverseGeocode = async (lat: number, lng: number): Promise<CountryData> => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
      );
      if (response.data && response.data.results.length > 0) {
        const addressComponents = response.data.results[0].address_components;
        const countryData: CountryData = {
          name: '',
          currencies: [],
        };

        for (const component of addressComponents) {
          if (component.types.includes('country')) {
            countryData.name = component.long_name;
          }
        }

        if (countryData.name) {
          // Fetch currency information for the country
          const currencyData = await fetchCurrencyInfo(countryData.name);
          countryData.currencies = currencyData.currencies;
        }

        return countryData;
      }
    } catch (error: any) {
      console.error('Error fetching address:', error.message);
    }
    return { name: 'Unknown Country', currencies: [] };
  };

  const fetchCurrencyInfo = async (countryName: string): Promise<CountryData> => {
    try {
      const response = await axios.get(`https://restcountries.com/v3/name/${countryName}`);
      return response.data[0];
    } catch (error: any) {
      console.error('Error fetching currency information:', error.message);
      return { name: 'Unknown Country', currencies: [] };
    }
  };
  
  return { country, currency, location };
};

export default useGeolocation;
