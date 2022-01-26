import { useProductQuery } from './products.query';
const useProduct = ({ slug }: { slug: string }) => {
  const { data, isLoading, error } = useProductQuery(slug);
  return {
    product: data,
    isLoading,
    error,
  };
};

export default useProduct;
