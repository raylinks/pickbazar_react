import { useRouter } from 'next/router';
import { usePopularProductsQuery } from '@framework/products/products.graphql';
import useHomepage from '@framework/utils/use-homepage';
interface UsePopularProductsProps {
  limit?: number;
  range?: number;
}
const usePopularProducts = ({
  limit = 15,
  range,
}: UsePopularProductsProps = {}) => {
  const { query } = useRouter();
  const { homePage } = useHomepage();

  const group = Array.isArray(query.pages)
    ? query.pages[0]
    : (homePage?.slug as string);
  const { data, loading, error } = usePopularProductsQuery({
    variables: {
      type_slug: group,
      limit: 8,
      ...(range && { range }),
    },
  });

  return {
    products: data?.popularProducts ?? [],
    isLoading: loading,
    error,
  };
};

export default usePopularProducts;
