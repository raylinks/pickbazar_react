import SectionBlock from '@components/ui/section-block';
import FilterBar from './filter-bar';
import Categories from '@components/categories/categories';
import CallToAction from '@components/cta/call-to-action';
import ProductsGrid from '@components/products/grid';
import GroupProducts from '@components/products/group-products';
import PopularProductsGrid from '@components/products/popular-products';
import TopAuthorsGrid from '@components/author/top-authors-grid';
import Banner from '@components/banners/banner';
import TopManufacturersGrid from '@components/manufacturer/top-manufacturers-grid';
import { useTranslation } from 'next-i18next';
import SellingProductsGrid from '@components/products/selling-products';

const Compact = () => {
  const { t } = useTranslation('common');
  return (
    <div className="flex flex-col flex-1 bg-white">
      <FilterBar className="lg:hidden" />
      <main className="w-full xl:overflow-hidden block mt-6">
        <SectionBlock>
          <Banner layout="compact" />
        </SectionBlock>
        <PopularProductsGrid limit={10} />
        <Categories layout="compact" />
        <GroupProducts />
        <SectionBlock title={t('text-new-arrival')}>
          <ProductsGrid
            limit={10}
            column="five"
            sortedBy="DESC"
            orderBy="created_at"
          />
        </SectionBlock>
        <TopAuthorsGrid />
        {/* <SellingProductsGrid limit={6} /> */}
        <TopManufacturersGrid />
        <CallToAction />
      </main>
    </div>
  );
};

export default Compact;
