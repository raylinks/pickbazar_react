import Banner from '@components/banners/banner';
import Categories from '@components/categories/categories';
// import Products from '@framework/products/products';
import ProductsGrid from '@components/products/grid';

import FilterBar from './filter-bar';

const Standard = () => {
  return (
    <>
      <Banner layout="standard" />
      <FilterBar />
      <Categories layout="standard" />
      <main className="flex-1">
        {/* <Products layout="standard" /> */}
        <ProductsGrid className="pb-8 px-4 lg:p-8" limit={30} />
      </main>
    </>
  );
};

export default Standard;
