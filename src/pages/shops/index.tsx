import { getLayout } from '@/components/layouts/layout';
import { NextPageWithLayout } from '@/types';
import { useTranslation } from 'next-i18next';
import ShopsGrid from '@/components/shops/grid';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import ShopsMapView from '@/components/shops/map-view';
import useGeolocation from '@/lib/hooks/use-geolocation';
import { SHOPS_LIMIT } from '@/lib/constants';
import { useShops } from '@/utilities/queries/shop';
import ErrorMessage from '@/components/ui/error-message';
import SelectCountry from '@/components/shops/select-country';
import { useEffect, useState } from 'react';
export { getStaticProps } from '@/utilities/shops-page.ssr';

const ShopsPage: NextPageWithLayout = () => {
  const { country } = useGeolocation();
  const [selectedContry, setSelectedContry] = useState<string>(country);
  const { t } = useTranslation('common');
  const limit = SHOPS_LIMIT;
  
  const { shops, isLoading, isLoadingMore, hasMore, loadMore, error } =
    useShops({
      limit,
      is_active: 1,
      country: selectedContry
    });

  useEffect(() => {
    setSelectedContry(country)
  }, [country])
    
  if (error) return <ErrorMessage message={error.message} />;
  
  return (
    <>
      <div className="min-h-screen bg-light ">
        <div className="mx-auto flex w-full max-w-6xl flex-col p-8 pt-14">
          <div className='flex justify-between items-start'>
            <h3 className="mb-8 text-2xl font-bold text-heading">
              {t('text-shops-nearby')}
            </h3>
            <SelectCountry selectedContry={selectedContry} setSelectedContry={setSelectedContry} />
          </div>

          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-lg bg-slate-400/20 p-1 mb-3">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded py-2.5 text-sm font-medium leading-5 text-white',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-amber-500 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-accent shadow'
                      : 'text-white hover:bg-white/[0.12] hover:text-amber-600'
                  )
                }
              >
                Map view
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded py-2.5 text-sm font-medium leading-5 text-white',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-amber-500 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-accent shadow'
                      : 'text-white hover:bg-white/[0.12] hover:text-amber-600'
                  )
                }
              >
                Grid view
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel><ShopsMapView shops={ shops} isLoading={isLoading} /></Tab.Panel>
              <Tab.Panel><ShopsGrid shops={ shops} isLoading={isLoading} limit={limit} hasMore={hasMore} loadMore={loadMore} isLoadingMore={isLoadingMore} /></Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
};

ShopsPage.getLayout = getLayout;

export default ShopsPage;
