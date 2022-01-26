import { useRouter } from 'next/router';
import { NetworkStatus } from '@apollo/client';
import { useAuthorsQuery } from './authors.graphql';

interface UseAuthorsProps {
  limit?: number;
}
const useAuthors = ({ limit = 30 }: UseAuthorsProps = {}) => {
  const { query } = useRouter();

  const { data, loading, error, fetchMore, networkStatus } = useAuthorsQuery({
    variables: {
      first: limit,
      ...(query?.text && { text: `%${query?.text}%` }),
    },
    notifyOnNetworkStatusChange: true,
  });
  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.authors?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.authors?.paginatorInfo?.currentPage + 1,
          first: limit,
        },
      });
    }
  }
  return {
    authors: data?.authors?.data ?? [],
    paginatorInfo: data?.authors?.paginatorInfo,
    isLoading: loading,
    isLoadingMore,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.authors?.paginatorInfo?.hasMorePages),
  };
};

export default useAuthors;
