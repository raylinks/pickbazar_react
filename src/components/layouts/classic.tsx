import ProductsGrid from '@components/products/grid';
import Banner from '@components/banners/banner';
import PromotionSliders from '@components/promotions/promotions';
import Categories from '@components/categories/categories';
import { Element } from 'react-scroll';
import FilterBar from './filter-bar';

const Classic = () => {
  return (
    <>
      <Banner layout="classic" />
      <PromotionSliders />
      <FilterBar />
      <Element
        name="grid"
        className="flex border-t border-solid border-border-200 border-opacity-70"
      >
        <Categories layout="classic" />
        <ProductsGrid className="pb-8 px-4 lg:p-8" limit={30} />
      </Element>
    </>
  );
};

export default Classic;
