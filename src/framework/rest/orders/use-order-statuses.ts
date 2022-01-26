import { useOrderStatusesQuery } from './orders.query';

const useOrderStatuses = () => {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useOrderStatusesQuery({
    limit: 100,
  });

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    orderStatuses: data?.pages.flatMap((page: any) => page.data) ?? [],
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

export default useOrderStatuses;
