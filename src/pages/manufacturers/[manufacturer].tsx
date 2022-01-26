import { FilterIcon } from '@components/icons/filter-icon';
import MobileNavigation from '@components/layouts/mobile-navigation';
import GeneralLayout from '@components/layouts/_general';
import Details from '@components/manufacturer/details';
import ProductsGrid from '@components/products/grid';
import SidebarFilter from '@components/search-view/sidebar-filter';
import { useWindowSize } from '@lib/use-window-size';
import { drawerAtom } from '@store/drawer-atom';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import StickyBox from 'react-sticky-box';
export { getStaticPaths, getStaticProps } from '@framework/ssr/manufacturer';

const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);

export default function Manufacturer({ manufacturer }: any) {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  return (
    <>
      <div className="flex flex-col w-full">
        <Details manufacturer={manufacturer} />
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-heading">
          {t('text-books')}
        </h2>
        <ProductsGrid column="five" />
      </div>

      {width > 1023 && <CartCounterButton />}
    </>
  );
}

const GetLayout = (page: React.ReactElement) => {
  const { t } = useTranslation('common');
  const [_, setDrawerView] = useAtom(drawerAtom);
  const type = page.props.manufacturer?.type?.slug;
  return (
    <GeneralLayout>
      <>
        <div className="w-full bg-light">
          <div className="flex w-full min-h-screen px-5 py-10 mx-auto max-w-1920 xl:py-14 xl:px-16 lg:space-s-10">
            <div className="flex-shrink-0 hidden w-80 lg:block">
              <StickyBox offsetTop={140} offsetBottom={30}>
                <SidebarFilter type={type} showManufacturers={false} />
              </StickyBox>
            </div>
            {page}
          </div>
        </div>
        <MobileNavigation>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() =>
              setDrawerView({
                display: true,
                view: 'SEARCH_FILTER',
                data: { type, showManufacturers: false },
              })
            }
            className="flex items-center justify-center h-full p-2 focus:outline-none focus:text-accent"
          >
            <span className="sr-only">{t('text-filter')}</span>
            <FilterIcon width="17.05" height="18" />
          </motion.button>
        </MobileNavigation>
      </>
    </GeneralLayout>
  );
};
Manufacturer.getLayout = GetLayout;
