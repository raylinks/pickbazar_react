import { useRouter } from 'next/router';
import { usePopularProductsQuery } from '@framework/products/products.query';
import useHomepage from '@framework/utils/use-homepage';
interface UsePopularProductsProps {
  limit?: number;
  range?: number;
}
const usePopularProducts = ({
  limit = 8,
  range,
}: UsePopularProductsProps = {}) => {
  const { query } = useRouter();
  const { homePage } = useHomepage();

  const group = Array.isArray(query.pages)
    ? query.pages[0]
    : (homePage?.slug as string);
  const { data, isLoading, error } = usePopularProductsQuery({
    type_slug: group,
    limit,
    ...(range && { range }),
    fields: ['type', 'author'],
  });
  return {
    products: data?.popularProducts?.data ?? [],
    isLoading,
    error,
  };
};

export default usePopularProducts;
