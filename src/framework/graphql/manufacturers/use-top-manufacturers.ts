import { useTopManufacturersQuery } from './manufacturers.graphql';

interface UseTopManufacturersProps {
  limit?: number;
}
const useTopManufacturers = ({ limit = 15 }: UseTopManufacturersProps = {}) => {
  const { data, loading, error } = useTopManufacturersQuery({
    variables: {
      limit,
    },
  });

  return {
    manufacturers: data?.topManufacturers ?? [],
    isLoading: loading,
    error,
  };
};

export default useTopManufacturers;
