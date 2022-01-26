import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import '@assets/css/main.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ModalProvider } from '@components/ui/modal/modal.context';
import ManagedModal from '@components/ui/modal/managed-modal';
import ManagedDrawer from '@components/ui/drawer/managed-drawer';
import DefaultSeo from '@components/seo/default-seo';
import { SearchProvider } from '@components/ui/search/search.context';
import PrivateRoute from '@lib/private-route';
import { CartProvider } from '@store/quick-cart/cart.context';
import AppProviders from '@framework/app/providers';
import SocialLogin from '@framework/auth/social-login';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  authenticate?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const authProps = Component.authenticate ?? false;

  return (
    <AppProviders pageProps={pageProps}>
      <SearchProvider>
        <ModalProvider>
          <CartProvider>
            <NextAuthProvider session={session}>
              <>
                <DefaultSeo />
                {authProps ? (
                  <PrivateRoute>
                    {getLayout(<Component {...pageProps} />)}
                  </PrivateRoute>
                ) : (
                  getLayout(<Component {...pageProps} />)
                )}
                <ManagedModal />
                <ManagedDrawer />
                <ToastContainer autoClose={2000} theme="colored" />
                <SocialLogin />
              </>
            </NextAuthProvider>
          </CartProvider>
        </ModalProvider>
      </SearchProvider>
    </AppProviders>
  );
}
export default appWithTranslation(CustomApp);
