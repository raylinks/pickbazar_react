import { NetworkStatus } from '@apollo/client';
import { useRefundsQuery } from './refunds.graphql';

interface UseRefundsProps {
  limit?: number;
}
const useRefunds = ({ limit = 15 }: UseRefundsProps = {}) => {
  const { data, loading, error, fetchMore, networkStatus } = useRefundsQuery({
    variables: {
      orderBy: 'created_at',
      sortedBy: 'desc',
    },
    notifyOnNetworkStatusChange: true,
  });

  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.refunds?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.refunds?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }
  return {
    refunds: data?.refunds?.data ?? [],
    paginatorInfo: data?.refunds?.paginatorInfo,
    isLoading: loading,
    isLoadingMore,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.refunds?.paginatorInfo?.hasMorePages),
  };
};

export default useRefunds;
