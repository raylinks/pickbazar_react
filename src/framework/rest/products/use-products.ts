import { useRouter } from 'next/router';
import { useProductsQuery } from '@framework/products/products.query';
import useHomepage from '@framework/utils/use-homepage';

interface UseProductsProps {
  shop_id?: string;
  tags?: string;
  limit?: number;
  searchQuery?: string;
  sortedBy?: string;
  orderBy?: string;
}

const useProducts = ({
  shop_id,
  tags,
  searchQuery,
  limit = 30,
  sortedBy,
  orderBy,
}: UseProductsProps = {}) => {
  const { query: routerQuery } = useRouter();
  const { homePage } = useHomepage();
  const { price, ...query } = routerQuery ?? {};
  const group = Array.isArray(query.pages)
    ? query.pages[0]
    : (homePage?.slug as string);
  const {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({
    limit,
    ...(!Boolean(shop_id) &&
      !query.author &&
      !query.searchType &&
      !query.manufacturer && { type: group }),
    ...(Boolean(shop_id) && { shop_id: Number(shop_id) }),
    ...(query.text && { name: query.text.toString() }),
    ...(query.category && { categories: query.category.toString() }),
    ...query,
    ...(query.searchType && { type: query.searchType.toString() }),
    ...(tags && { tags: tags.toString() }),
    ...(searchQuery && { name: searchQuery.toString() }),
    fields: ['type', 'author'],
    ...(price && { min_price: price as string }),
    ...(sortedBy && !query.sortedBy && { sortedBy }),
    ...(orderBy && !query.orderBy && { orderBy }),
  });

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    products: data?.pages.flatMap((page: any) => page.data) ?? [],
    paginatorInfo: Array.isArray(data?.pages)
      ? data?.pages[data.pages.length - 1]?.paginatorInfo
      : {},
    isLoading: isFetching,
    isLoadingMore: isFetchingNextPage,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  };
};

export default useProducts;
