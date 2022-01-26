import { NetworkStatus } from '@apollo/client';
import {
  QueryOrderStatusesOrderByColumn,
  SortOrder,
} from '__generated__/__types__';
import { useOrderStatusesQuery } from './orders.graphql';

const useOrderStatuses = () => {
  const { data, loading, error, fetchMore, networkStatus } =
    useOrderStatusesQuery({
      variables: {
        first: 100,
        page: 1,
        orderBy: [
          {
            column: QueryOrderStatusesOrderByColumn.Serial,
            order: SortOrder.Asc,
          },
        ],
      },
      notifyOnNetworkStatusChange: true,
    });

  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.orderStatuses?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.orderStatuses?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }
  return {
    orderStatuses: data?.orderStatuses?.data ?? [],
    paginatorInfo: data?.orderStatuses?.paginatorInfo,
    isLoading: loading,
    isLoadingMore,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.orderStatuses?.paginatorInfo?.hasMorePages),
  };
};

export default useOrderStatuses;
