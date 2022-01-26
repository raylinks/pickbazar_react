import { useShopsQuery } from './shops.query';

interface UseShopsProps {
  limit?: number;
}
const useShops = ({ limit = 15 }: UseShopsProps = {}) => {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useShopsQuery({
    is_active: 1,
    limit,
  });

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    shops: data?.pages.flatMap((page: any) => page.data) ?? [],
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

export default useShops;
