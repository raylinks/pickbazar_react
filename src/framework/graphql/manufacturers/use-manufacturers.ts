import { useRouter } from 'next/router';
import { NetworkStatus } from '@apollo/client';
import { useManufacturersQuery } from './manufacturers.graphql';
import {
  QueryManufacturersHasTypeColumn,
  SqlOperator,
} from '__generated__/__types__';

interface UseManufacturersProps {
  limit?: number;
}
const useManufacturers = ({ limit = 30 }: UseManufacturersProps = {}) => {
  const { query } = useRouter();

  const { data, loading, error, fetchMore, networkStatus } =
    useManufacturersQuery({
      variables: {
        first: limit,
        ...(query?.text && { text: `%${query?.text}%` }),
        ...(query.searchType && {
          hasType: {
            column: QueryManufacturersHasTypeColumn.Slug,
            operator: SqlOperator.Eq,
            value: query.searchType,
          },
        }),
      },
      notifyOnNetworkStatusChange: true,
    });
  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.manufacturers?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.manufacturers?.paginatorInfo?.currentPage + 1,
          first: limit,
        },
      });
    }
  }

  return {
    manufacturers: data?.manufacturers?.data ?? [],
    paginatorInfo: data?.manufacturers?.paginatorInfo,
    isLoading: loading,
    isLoadingMore,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.manufacturers?.paginatorInfo?.hasMorePages),
  };
};

export default useManufacturers;
