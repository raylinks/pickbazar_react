import { useDownloadableProductsQuery } from '@framework/products/products.graphql';
import { NetworkStatus } from '@apollo/client';
interface UseDownloadableProductsProps {
  limit?: number;
}
const useDownloadableProducts = ({
  limit = 15,
}: UseDownloadableProductsProps = {}) => {
  const { data, loading, error, fetchMore, networkStatus } =
    useDownloadableProductsQuery({
      variables: {
        first: limit,
      },
      notifyOnNetworkStatusChange: true,
    });
  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.downloads?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.downloads?.paginatorInfo?.currentPage + 1,
          first: 5,
        },
      });
    }
  }
  return {
    downloads: data?.downloads?.data ?? [],
    paginatorInfo: data?.downloads?.paginatorInfo,
    isLoading: loading,
    isLoadingMore,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.downloads?.paginatorInfo?.hasMorePages),
  };
};

export default useDownloadableProducts;
