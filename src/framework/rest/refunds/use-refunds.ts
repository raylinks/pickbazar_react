import { useRefundsQuery } from './refunds.query';

interface UseRefundsProps {
  limit?: number;
}
const useRefunds = ({ limit = 15 }: UseRefundsProps = {}) => {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useRefundsQuery({
    orderBy: 'created_at',
    sortedBy: 'desc',
  });

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    refunds: data?.pages.flatMap((page: any) => page.data) ?? [],
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

export default useRefunds;
