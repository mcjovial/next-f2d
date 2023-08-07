import { Shop } from '@/types';
import React, { useState } from 'react';
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
  InfoWindow,
} from 'react-google-maps';

// interface Shop {
//   id: string;
//   name: string;
//   address: {
//     lat: string;
//     lng: string;
//   };
// }

interface ShopMapProps {
  shops: Shop[];
}

const ShopMap: React.FC<ShopMapProps> = ({ shops }) => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  
  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{
        lat: parseFloat(shops[0]?.address.lat),
        lng: parseFloat(shops[0]?.address.lng),
      }}
    >
      {shops.map((shop) => (
        <Marker
          key={shop.id}
          position={{
            lat: parseFloat(shop.address.lat),
            lng: parseFloat(shop.address.lng),
          }}
          title={shop.name}
          onClick={() => setSelectedShop(shop)}
        >
          {selectedShop === shop && (
            <InfoWindow
              onCloseClick={() => setSelectedShop(null)}
            >
              <div className='space-y-1'>
                <h3 className='font-bold'>{selectedShop.name}</h3>
                <p className=''>{selectedShop.description}</p>
                <a className='underline text-sm text-accent' href={selectedShop.link} target="_blank" rel="noopener noreferrer">
                  Visit Shop
                </a>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(ShopMap));

export default WrappedMap;
