import { useRouter } from 'next/router';
import { NetworkStatus } from '@apollo/client';
import useHomepage from '@framework/utils/use-homepage';
import { getCategories } from '@framework/utils/categories';
import { useCategoriesQuery } from './categories.graphql';
interface UseProductsProps {
  type?: string;
  layout?: string;
  limit?: number;
}
const useCategories = ({
  type,
  layout,
  limit = 1000,
}: UseProductsProps = {}) => {
  const { query } = useRouter();
  const { homePage } = useHomepage();

  const group = Array.isArray(query.pages)
    ? query.pages[0]
    : (homePage?.slug as string);

  const { data, loading, error, networkStatus, fetchMore } = useCategoriesQuery(
    {
      variables: getCategories({
        ...(Boolean(type)
          ? { type }
          : { type: (query.searchType as string) ?? group }),
        ...(layout === 'minimal' ? {} : { parent: null }),
        limit,
      }),
      notifyOnNetworkStatusChange: true,
    }
  );
  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.categories?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.categories?.paginatorInfo?.currentPage + 1,
          first: 5,
        },
      });
    }
  }

  return {
    categories: data?.categories?.data ?? [],
    paginatorInfo: data?.categories?.paginatorInfo,
    isLoading: loading,
    isLoadingMore,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.categories?.paginatorInfo?.hasMorePages),
  };
};

export default useCategories;
