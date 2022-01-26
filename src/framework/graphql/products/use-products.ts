import { useRouter } from 'next/router';
import { useProductsQuery } from '@framework/products/products.graphql';
import { NetworkStatus } from '@apollo/client';
import { getProducts } from '@framework/utils/products';
import { QueryProductsOrderByColumn, SortOrder } from '__generated__/__types__';
import useHomepage from '@framework/utils/use-homepage';
interface UseProductsProps {
  tags?: string;
  shop_id?: string;
  limit?: number;
  searchQuery?: string;
  sortedBy?: string;
  orderBy?: string;
}
const useProducts = ({
  tags,
  shop_id,
  searchQuery,
  limit = 30,
  sortedBy,
  orderBy,
}: UseProductsProps = {}) => {
  const { query } = useRouter();
  const { homePage } = useHomepage();

  const group = Array.isArray(query.pages)
    ? query.pages[0]
    : (homePage?.slug as string);
  const { data, loading, error, fetchMore, networkStatus } = useProductsQuery({
    // skip: !Boolean(group),
    ...(searchQuery && { skip: searchQuery.length < 2 }),
    // @ts-ignore
    variables: getProducts({
      shopId: Number(shop_id),
      type: (query?.searchType as string) ?? group,
      text: query?.text as string,
      ...(searchQuery && { text: searchQuery }),
      category: query?.category as string,
      author: query?.author as string,
      priceRange: query?.price as string,
      orderField: query?.orderBy as QueryProductsOrderByColumn,
      ...(orderBy &&
        !query?.orderBy && {
          orderField: orderBy as QueryProductsOrderByColumn,
        }),
      manufacturer: query?.manufacturer?.toString(),
      tags: tags ?? (query?.tags as string),
      sortOrder: query?.sortedBy as SortOrder,
      ...(sortedBy && !query?.sortedBy && { sortOrder: sortedBy as SortOrder }),
      limit,
    }),
    notifyOnNetworkStatusChange: true,
  });
  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.products?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.products?.paginatorInfo?.currentPage + 1,
          first: 30,
        },
      });
    }
  }

  return {
    products: data?.products?.data ?? [],
    paginatorInfo: data?.products?.paginatorInfo,
    isLoading: loading,
    isLoadingMore,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.products?.paginatorInfo?.hasMorePages),
  };
};

export default useProducts;
