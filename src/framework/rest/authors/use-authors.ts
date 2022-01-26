import { useRouter } from 'next/router';
import { useAuthorsQuery } from './authors.query';

interface UseAuthorsProps {
  limit?: number;
}
const useAuthors = ({ limit = 30 }: UseAuthorsProps = {}) => {
  const { query } = useRouter();

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useAuthorsQuery({
    limit,
    ...(query?.text && { name: `%${query?.text}%` }),
  });
  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    authors: data?.pages.flatMap((page: any) => page.data) ?? [],
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

export default useAuthors;
