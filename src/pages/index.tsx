import { useTranslation } from 'next-i18next';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
// import CartCounterButton from '@/components/cart/cart-counter-button'
import { useWindowSize } from 'react-use';
import { getStaticProps } from '@/utilities/home-pages.ssr';
import { HomePageProps, HomePageVariables } from '@/types';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useCurrency } from '@/store/currency/currency.context';
import { useRouter } from 'next/router';
export { getStaticProps };

const ShopHome = dynamic(() => import('@/components/layouts/home'), {
  ssr: false,
});

const CartCounterButton = dynamic(
  () => import('@/components/cart/cart-counter-button'),
  { ssr: false }
);

function Home({ variables }: HomePageProps) {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const router = useRouter();
  const { currency } = router.query;
  const [hybridVars, setHybridVars] = useState<HomePageVariables>(variables)
  console.log(variables);
  
  useEffect(() => {
    if (currency) {
      // Update currency value in hybridVars based on the query parameter
      const products = {...hybridVars?.products, currency: currency as string}
      const updatedVars = { ...hybridVars, products };
      setHybridVars(updatedVars);
    }  }, [currency])

  return (
    <>
      <Seo title='Farm2door' url='farm-to-door' /*images={banners}*/ />
      <ShopHome variables={hybridVars} />
      {width > 1023 && <CartCounterButton />}
    </>
  );
}

Home.getLayout = getLayout;

export default Home;
