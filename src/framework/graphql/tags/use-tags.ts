import { useRouter } from 'next/router';
import { NetworkStatus } from '@apollo/client';
import { useTagsQuery } from './tags.graphql';
import { SqlOperator, QueryTagsHasTypeColumn } from '__generated__/__types__';

interface UseTagsProps {
  limit?: number;
}
const useTags = ({ limit = 15 }: UseTagsProps = {}) => {
  const { query } = useRouter();

  const { data, loading, error, networkStatus, fetchMore } = useTagsQuery({
    variables: {
      ...(query.searchType && {
        hasType: {
          column: QueryTagsHasTypeColumn.Slug,
          operator: SqlOperator.Eq,
          value: query.searchType,
        },
      }),
      first: 1000,
    },
    notifyOnNetworkStatusChange: true,
  });
  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.tags?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.tags?.paginatorInfo?.currentPage + 1,
          first: limit,
        },
      });
    }
  }

  return {
    tags: data?.tags?.data ?? [],
    paginatorInfo: data?.tags?.paginatorInfo,
    isLoading: loading,
    isLoadingMore,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.tags?.paginatorInfo?.hasMorePages),
  };
};

export default useTags;
