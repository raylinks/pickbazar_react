import { useRouter } from 'next/router';
import { useOrderQuery } from './orders.graphql';

const useOrder = () => {
  const { query } = useRouter();

  const { data, loading, error } = useOrderQuery({
    variables: {
      tracking_number: query.tracking_number as string,
    },
  });

  return {
    order: data?.order,
    isLoading: loading,
    error,
  };
};

export default useOrder;
