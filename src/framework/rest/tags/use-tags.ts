import { useRouter } from 'next/router';
import { useTagsQuery } from './tags.query';

interface UseTagsProps {
  limit?: number;
}
const useTags = ({ limit = 100 }: UseTagsProps = {}) => {
  const { query } = useRouter();

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useTagsQuery({
    ...(query.searchType && {
      type: query.searchType.toString(),
    }),
    limit,
  });
  function handleLoadMore() {
    fetchNextPage();
  }
  return {
    tags: data?.pages.flatMap((page: any) => page.data) ?? [],
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

export default useTags;
