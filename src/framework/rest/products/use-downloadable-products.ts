import { useDownloadableProductsQuery } from '@framework/products/products.query';
interface UseDownloadableProductsProps {
  limit?: number;
}
const useDownloadableProducts = ({
  limit = 30,
}: UseDownloadableProductsProps = {}) => {
  const {
    data,
    isFetching,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useDownloadableProductsQuery({
    limit,
  });
  function handleLoadMore() {
    fetchNextPage();
  }
  return {
    downloads: data?.pages.flatMap((page: any) => page.data) ?? [],
    paginatorInfo: Array.isArray(data?.pages)
      ? data?.pages[data.pages.length - 1]?.paginatorInfo
      : {},
    isLoading,
    isLoadingMore: isFetchingNextPage,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  };
};

export default useDownloadableProducts;
