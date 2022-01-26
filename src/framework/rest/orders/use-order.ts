import { useRouter } from 'next/router';
import { useOrderQuery } from './orders.query';

const useOrder = () => {
  const { query } = useRouter();

  const { data, isLoading, error } = useOrderQuery({
    tracking_number: query.tracking_number as string,
  });

  return {
    order: data?.order,
    isLoading,
    error,
  };
};

export default useOrder;
