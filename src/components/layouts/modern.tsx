import Banner from '@components/banners/banner';
import Categories from '@components/categories/categories';
// import Products from '@framework/products/products';
import ProductsGrid from '@components/products/grid';
import { Element } from 'react-scroll';
import FilterBar from './filter-bar';

const Modern = () => {
  return (
    <div className="flex flex-1 bg-gray-100">
      <div className="sticky top-22 h-full lg:w-[380px] hidden xl:block bg-gray-100">
        <Categories layout="modern" />
      </div>

      <main className="w-full xl:overflow-hidden block lg:mt-6 xl:ps-0 xl:pe-5">
        <div className="border border-border-200">
          <Banner layout="modern" />
        </div>
        <FilterBar />
        <Element name="grid" className="px-4 xl:px-0">
          {/* <Products layout="modern" /> */}
          <ProductsGrid className="py-6" limit={30} />
        </Element>
      </main>
    </div>
  );
};

export default Modern;
