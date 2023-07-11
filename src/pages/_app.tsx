import '@/styles/main.css';
import '@/styles/custom-plugins.css';
import { getDirection } from '@/lib/constants';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/types';
import QueryProvider from '@/utilities/client/query-provider';
import { SearchProvider } from '@/components/ui/search/search.context';
import { ModalProvider } from '@/components/ui/modal/modal.context';
import ManagedModal from '@/components/ui/modal/managed-modal';
import { CartProvider } from '@/store/quick-cart/cart.context';
import ManagedDrawer from '@/components/ui/drawer/managed-drawer';
import DefaultSeo from '@/components/seo/default-seo';
import PrivateRoute from '@/lib/private-route';
import { ToastContainer } from 'react-toastify';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const authenticationRequired = Component.authenticationRequired ?? false;

  const { locale } = useRouter();
  const dir = getDirection(locale);

  return (
    <div dir={dir}>
      <QueryProvider pageProps={pageProps}>
        <SearchProvider>
          <ModalProvider>
            <CartProvider>
              <>
                <DefaultSeo />
                {authenticationRequired ? (
                  <PrivateRoute>
                    {getLayout(<Component {...pageProps} />)}
                  </PrivateRoute>
                ) : (
                  getLayout(<Component {...pageProps} />)
                )}
                <ManagedModal />
                <ManagedDrawer />
                <ToastContainer autoClose={2000} theme="colored" />
              </>  
            </CartProvider>
          </ModalProvider>
        </SearchProvider>
      </QueryProvider>
    </div>
  );
}

export default appWithTranslation(App);
