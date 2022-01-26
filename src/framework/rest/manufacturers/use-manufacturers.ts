import { useRouter } from 'next/router';
import { useManufacturersQuery } from './manufacturers.query';

interface UseManufacturersProps {
  limit?: number;
}
const useManufacturers = ({ limit = 30 }: UseManufacturersProps = {}) => {
  const { query } = useRouter();

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useManufacturersQuery({
    limit,
    ...(query.searchType && { type: query.searchType.toString() }),
    ...(query?.text && { name: `%${query?.text}%` }),
  });
  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    manufacturers: data?.pages.flatMap((page: any) => page.data) ?? [],
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

export default useManufacturers;
