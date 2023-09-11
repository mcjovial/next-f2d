import { SHOPS_LIMIT } from '@/lib/constants';
import { useShops } from '@/utilities/queries/shop';
import React, { memo } from 'react';
import ErrorMessage from '../ui/error-message';
import NotFound from '../ui/not-found';
import rangeMap from '@/utilities/range-map';
import CouponLoader from '../ui/loaders/content-loader';
import ShopCard from '../ui/cards/shop';
import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import { getLayout } from '../layouts/layout';
import useGeolocation from '@/lib/hooks/use-geolocation';
import { Shop } from '@/types';

type Props = {
  shops: Shop[];
  isLoading: boolean;
  limit: number;
  hasMore: boolean;
  loadMore: () => void;
  isLoadingMore: boolean;
};

const ShopsGrid = (props: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {props.isLoading && !props.shops.length ? (
          <>
            {rangeMap(props.limit, (i) => (
              <CouponLoader key={i} uniqueKey={`shops-${i}`} />
            ))}
          </>
        ) : (
          props.shops.map((shop) => <ShopCard shop={shop} key={shop.id} />)
        )}
      </div>
      {props.hasMore && (
        <div className="mt-8 flex items-center justify-center lg:mt-12">
          <Button onClick={props.loadMore} loading={props.isLoadingMore}>
            {t('text-load-more')}
          </Button>
        </div>
      )}
    </>
  );
};

ShopsGrid.getLayout = getLayout;

export default memo(ShopsGrid);
