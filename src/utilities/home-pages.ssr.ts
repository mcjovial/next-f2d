import type {
  CategoryQueryOptions,
  CountryData,
  HomePageProps,
  PopularProductQueryOptions,
  SettingsQueryOptions,
} from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import invariant from 'tiny-invariant';
import client from './client';
import { API_ENDPOINTS } from './client/api-endpoints';
import {
  CATEGORIES_PER_PAGE,
  PRODUCTS_PER_PAGE,
} from './client/variables';
import axios from 'axios';

type ParsedQueryParams = {
  pages: string[];
};

export const getStaticProps: GetStaticProps<
  HomePageProps,
  ParsedQueryParams
> = async ({ locale, params }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.SETTINGS, { language: locale }],
    ({ queryKey }) => client.settings.all(queryKey[1] as SettingsQueryOptions)
  );

  const fetchCurrencyInfo = async (countryName: string): Promise<CountryData> => {
    try {
      const response = await axios.get(`https://restcountries.com/v3/name/${countryName}`);
      return response.data[0];
    } catch (error: any) {
      console.error('Error fetching currency information:', error.message);
      return { name: 'Unknown Country', currencies: [] };
    }
  };
  
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

  const fetchCurrency = async () => {
    try {
      const geolocationApiResponse = await axios.post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
      );
      const { lat, lng } = geolocationApiResponse.data.location;        

      // Call the reverse geocoding function to get the country
      const countryData = await reverseGeocode(lat, lng);
      const country =countryData.name;
      const currency = Object.keys(countryData.currencies)[0];
      return currency;
    } catch (error: any) {
      console.error('Error fetching geolocation data:', error.message);
    }
  }

  const customerCountryCurrency = await fetchCurrency();

  const productVariables = {
    limit: PRODUCTS_PER_PAGE,
    currency: customerCountryCurrency
  };
  await queryClient.prefetchInfiniteQuery(
    [API_ENDPOINTS.PRODUCTS, { limit: PRODUCTS_PER_PAGE, /*type: pageType,*/ language: locale }],
    ({ queryKey }) => client.products.all(queryKey[1] as any)
  );

  const popularProductVariables = {
    // type_slug: pageType,
    limit: 10,
    with: 'type;author',
    language: locale
  };

  const categoryVariables = {
    // type: pageType,
    limit: CATEGORIES_PER_PAGE,
    language: locale,
    parent: 'all'
    //   types.find((t) => t.slug === pageType)?.settings.layoutType === 'minimal'
    //     ? 'all'
    //     : 'null',
  };
  await queryClient.prefetchInfiniteQuery(
    [API_ENDPOINTS.CATEGORIES, categoryVariables],
    ({ queryKey }) => client.categories.all(queryKey[1] as CategoryQueryOptions)
  );

  return {
    props: {
      variables: {
        popularProducts: popularProductVariables,
        products: productVariables,
        categories: categoryVariables,
      },
      ...(await serverSideTranslations(locale!, ['common', 'banner'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 120,
  };
};

/* Fix : locales: 14kB,
popularProducts: 30kB,
category: 22kB,
groups: 8kB,
group: 2kB,
settings: 2kB,
perProduct: 4.2 * 30 = 120kB,
total = 14 + 30 + 22 + 8 + 2 + 2 + 120 = 198kB
others: 225 - 198 = 27kB
 */
