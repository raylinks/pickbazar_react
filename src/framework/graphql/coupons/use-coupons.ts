import { useRouter } from 'next/router';
import { NetworkStatus } from '@apollo/client';
import { useCouponsQuery } from './coupons.graphql';

interface UseCouponsProps {
  limit?: number;
}
const useCoupons = ({ limit = 15 }: UseCouponsProps = {}) => {
  const { query } = useRouter();

  const { data, loading, error, fetchMore, networkStatus } = useCouponsQuery({
    variables: {
      first: 16,
    },
    notifyOnNetworkStatusChange: true,
  });
  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.coupons?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.coupons?.paginatorInfo?.currentPage + 1,
          first: limit,
        },
      });
    }
  }
  return {
    coupons: data?.coupons?.data ?? [],
    paginatorInfo: data?.coupons?.paginatorInfo,
    isLoading: loading,
    isLoadingMore,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.coupons?.paginatorInfo?.hasMorePages),
  };
};

export default useCoupons;
