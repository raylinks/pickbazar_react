import { NetworkStatus } from '@apollo/client';
import { useShopsQuery } from './shops.graphql';

interface UseShopsProps {
  limit?: number;
}
const useShops = ({ limit = 15 }: UseShopsProps = {}) => {
  const { data, loading, error, fetchMore, networkStatus } = useShopsQuery({
    variables: {
      is_active: true,
    },
    notifyOnNetworkStatusChange: true,
  });

  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.shops?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.shops?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }
  return {
    shops: data?.shops?.data ?? [],
    paginatorInfo: data?.shops?.paginatorInfo,
    isLoading: loading,
    isLoadingMore,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.shops?.paginatorInfo?.hasMorePages),
  };
};

export default useShops;
