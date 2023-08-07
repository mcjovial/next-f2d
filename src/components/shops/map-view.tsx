import React, { memo } from 'react';
import WrappedMap from './map';
import { Shop } from '@/types';
import NotFound from '../ui/not-found';

const ShopMapPage: React.FC<{ shops: Shop[], isLoading: boolean }> = ({ shops, isLoading }) => {
  
  if (!isLoading && !shops.length) {
    return (
      <div className='min-h-full px-4 pt-6 pb-8 bg-gray-100 lg:p-8'>
        <NotFound text='text-no-shops' />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <WrappedMap
        shops={shops.map((shop) => ({
          ...shop,
          link: `/shops/${shop.slug}`,
        }))}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
};

export default memo(ShopMapPage);
