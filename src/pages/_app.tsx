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

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { locale } = useRouter();
  const dir = getDirection(locale);

  return (
    <div dir={dir}>
      <QueryProvider pageProps={pageProps}>
        <SearchProvider>
          <ModalProvider>
            {getLayout(<Component {...pageProps} />)}
          </ModalProvider>
        </SearchProvider>
      </QueryProvider>
    </div>
  );
}

export default appWithTranslation(App);
