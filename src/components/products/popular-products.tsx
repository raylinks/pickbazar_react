import ProductLoader from '@components/ui/loaders/product-loader';
import NotFound from '@components/ui/not-found';
import rangeMap from '@lib/range-map';
import ProductCard from '@components/products/cards/card';
import ErrorMessage from '@components/ui/error-message';
import usePopularProducts from '@framework/products/use-popular-products';
import SectionBlock from '@components/ui/section-block';
import { useTranslation } from 'next-i18next';

interface Props {
  limit?: number;
}

const PopularProductsGrid: React.FC<
  React.AllHTMLAttributes<HTMLDivElement> & Props
> = ({ className, limit = 10 }) => {
  const { t } = useTranslation('common');
  const { products, isLoading, error } = usePopularProducts({ limit });

  if (error) return <ErrorMessage message={error.message} />;
  if (!isLoading && !products.length) {
    return (
      <SectionBlock title={t('text-popular-products')}>
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </SectionBlock>
    );
  }

  return (
    <SectionBlock title={t('text-popular-products')}>
      <div className={`${className} w-full`}>
        <div className="grid gap-6 xl:gap-8 gap-y-10 xl:gap-y-12 grid-cols-[repeat(auto-fill,minmax(260px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] 2xl:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
          {isLoading && !products.length
            ? rangeMap(limit, (i) => (
                <ProductLoader key={i} uniqueKey={`product-${i}`} />
              ))
            : products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
        </div>
      </div>
    </SectionBlock>
  );
};

export default PopularProductsGrid;
