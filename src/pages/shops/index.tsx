import { getLayout } from '@/components/layouts/layout';
import { NextPageWithLayout } from '@/types';
import { useTranslation } from 'next-i18next';
import { SHOPS_LIMIT } from '@/lib/constants';
import NotFound from '@/components/ui/not-found';
import ErrorMessage from '@/components/ui/error-message';
import { useShops } from '@/utilities/queries/shop';
import rangeMap from '@/utilities/range-map';
import Button from '@/components/ui/button';
import CouponLoader from '@/components/ui/loaders/content-loader';
import ShopCard from '@/components/ui/cards/shop';
export { getStaticProps } from '@/utilities/shops-page.ssr';

const ShopsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const limit = SHOPS_LIMIT;
  const { shops, isLoading, isLoadingMore, hasMore, loadMore, error } =
    useShops({
      limit,
      is_active: 1,
    });
  if (error) return <ErrorMessage message={error.message} />;
  if (!isLoading && !shops.length) {
    return (
      <div className='min-h-full px-4 pt-6 pb-8 bg-gray-100 lg:p-8'>
        <NotFound text='text-no-shops' />
      </div>
    );
  }
  return (
    <>
      <div className='min-h-screen bg-light '>
        <div className='flex flex-col w-full max-w-6xl p-8 mx-auto pt-14'>
          <h3 className='mb-8 text-2xl font-bold text-heading'>
            {t('text-shops-nearby')}
          </h3>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {isLoading && !shops.length ? (
              <>
                {rangeMap(limit, (i) => (
                  <CouponLoader key={i} uniqueKey={`shops-${i}`} />
                ))}
              </>
            ) : (
              shops.map((shop) => <ShopCard shop={shop} key={shop.id} />)
            )}
          </div>
          {hasMore && (
            <div className='flex items-center justify-center mt-8 lg:mt-12'>
              <Button onClick={loadMore} loading={isLoadingMore}>
                {t('text-load-more')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

ShopsPage.getLayout = getLayout;

export default ShopsPage;
