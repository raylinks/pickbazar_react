import { useProductQuery } from './products.graphql';
const useProduct = ({ slug }: { slug: string }) => {
  const { data, loading, error } = useProductQuery({
    variables: {
      slug,
    },
  });
  return {
    product: data?.product,
    isLoading: loading,
    error,
  };
};

export default useProduct;
