import { useTranslation } from 'next-i18next';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
// import CartCounterButton from '@/components/cart/cart-counter-button'
import { useWindowSize } from 'react-use';
import { getStaticProps } from '@/utilities/home-pages.ssr';
import { HomePageProps } from '@/types';
import dynamic from 'next/dynamic';
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

  return (
    <>
      <Seo title='Farm2door' url='farm-to-door' /*images={banners}*/ />
      <ShopHome variables={variables} />
      {width > 1023 && <CartCounterButton />}
    </>
  );
}

Home.getLayout = getLayout;

export default Home;
