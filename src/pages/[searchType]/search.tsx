import { FilterIcon } from '@components/icons/filter-icon';
import MobileNavigation from '@components/layouts/mobile-navigation';
import GeneralLayout from '@components/layouts/_general';
import { Grid } from '@components/products/grid';
import SearchCount from '@components/search-view/search-count';
import SidebarFilter from '@components/search-view/sidebar-filter';
import Sorting from '@components/search-view/sorting';
import ErrorMessage from '@components/ui/error-message';
import useProducts from '@framework/products/use-products';
import { drawerAtom } from '@store/drawer-atom';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import StickyBox from 'react-sticky-box';
export { getServerSideProps } from '@framework/ssr/search';

export default function SearchPage() {
  const {
    products,
    isLoading,
    paginatorInfo,
    error,
    loadMore,
    isLoadingMore,
    hasMore,
  } = useProducts({
    orderBy: 'created_at',
    sortedBy: 'DESC',
  });
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-between md:flex-row mb-7">
        <SearchCount
          from={paginatorInfo?.firstItem ?? 0}
          to={paginatorInfo?.lastItem ?? 0}
          total={paginatorInfo?.total ?? 0}
        />
        <div className="max-w-xs mt-4 md:mt-0">
          <Sorting variant="dropdown" />
        </div>
      </div>
      <Grid
        products={products}
        loadMore={loadMore}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        error={error}
        column="five"
      />
    </div>
  );
}

const GetLayout = (page: React.ReactElement) => {
  const { t } = useTranslation('common');
  const [_, setDrawerView] = useAtom(drawerAtom);
  return (
    <GeneralLayout>
      <>
        <div className="w-full bg-light">
          <div className="flex w-full min-h-screen px-5 py-10 mx-auto max-w-1920 xl:py-14 xl:px-16 lg:space-s-10">
            <div className="flex-shrink-0 hidden w-80 lg:block">
              <StickyBox offsetTop={140} offsetBottom={30}>
                <SidebarFilter />
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

SearchPage.getLayout = GetLayout;
