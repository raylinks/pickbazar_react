import { NetworkStatus } from '@apollo/client';
import { useOrdersQuery } from './orders.graphql';

const useOrders = () => {
  const { data, loading, error, fetchMore, networkStatus } = useOrdersQuery({
    variables: {
      first: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.orders?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.orders?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }
  return {
    orders: data?.orders?.data ?? [],
    paginatorInfo: data?.orders?.paginatorInfo,
    isLoading: loading,
    isLoadingMore,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.orders?.paginatorInfo?.hasMorePages),
  };
};

export default useOrders;
