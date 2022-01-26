import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Button from '@components/ui/button';
import ProductLoader from '@components/ui/loaders/product-loader';
import NotFound from '@components/ui/not-found';
import rangeMap from '@lib/range-map';
import ProductCard from '@components/products/cards/card';
import ErrorMessage from '@components/ui/error-message';
import useProducts from '@framework/products/use-products';

interface Props {
  limit?: number;
  sortedBy?: string;
  orderBy?: string;
  column?: 'five' | 'auto';
  shopId?: string;
  gridClassName?: string;
  products?: any;
  isLoading?: boolean;
  error?: any;
  loadMore?: any;
  isLoadingMore?: boolean;
  hasMore?: boolean;
}

export const Grid: React.FC<
  React.AllHTMLAttributes<HTMLDivElement> & Props
> = ({
  className,
  gridClassName,
  products,
  isLoading,
  error,
  loadMore,
  isLoadingMore,
  hasMore,
  limit = 30,
  column = 'auto',
}) => {
  const { t } = useTranslation('common');

  if (error) return <ErrorMessage message={error.message} />;

  if (!isLoading && !products.length) {
    return (
      <div className="w-full min-h-full px-4 pt-6 pb-8 lg:p-8">
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          {
            'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3':
              column === 'auto',
            'grid gap-6 xl:gap-8 gap-y-10 xl:gap-y-11 grid-cols-[repeat(auto-fill,minmax(260px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] 2xl:grid-cols-5 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]':
              column === 'five',
          },
          gridClassName
        )}
      >
        {isLoading && !products.length
          ? rangeMap(limit, (i) => (
              <ProductLoader key={i} uniqueKey={`product-${i}`} />
            ))
          : products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8 lg:mt-12">
          <Button
            loading={isLoadingMore}
            onClick={loadMore}
            className="text-sm font-semibold md:text-base h-11"
          >
            {t('text-load-more')}
          </Button>
        </div>
      )}
    </div>
  );
};
const ProductsGrid: React.FC<
  React.AllHTMLAttributes<HTMLDivElement> & Props
> = ({
  className,
  shopId,
  gridClassName,
  limit = 30,
  sortedBy,
  orderBy,
  column = 'auto',
}) => {
  const { products, loadMore, isLoadingMore, isLoading, hasMore, error } =
    useProducts({
      limit,
      shop_id: shopId,
      sortedBy,
      orderBy,
    });

  return (
    <Grid
      products={products}
      loadMore={loadMore}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      error={error}
      limit={limit}
      className={className}
      gridClassName={gridClassName}
      column={column}
    />
  );
};

export default ProductsGrid;
