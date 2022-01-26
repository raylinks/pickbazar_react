import { useRouter } from 'next/router';
import useHomepage from '@framework/utils/use-homepage';
import { useCategoriesQuery } from './categories.query';
interface UseProductsProps {
  type?: string;
  layout?: string;
  limit?: number;
}

const getType = (
  type: string | undefined,
  queryType: string | undefined,
  defaultType: string
) => {
  if (type) {
    return type;
  }
  if (queryType) {
    return queryType;
  }
  return defaultType;
};
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

  const { data, isLoading, error } = useCategoriesQuery({
    type: getType(type, query.searchType?.toString(), group),
    limit,
    parent: layout === 'minimal' ? 'all' : 'null',
  });

  return {
    categories: data?.categories?.data ?? [],
    isLoading,
    error,
  };
};

export default useCategories;
