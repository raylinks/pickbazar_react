import { useTopManufacturersQuery } from './manufacturers.query';

interface UseTopManufacturersProps {
  limit?: number;
}
const useTopManufacturers = ({ limit = 15 }: UseTopManufacturersProps = {}) => {
  const { data, isLoading, error } = useTopManufacturersQuery({
    limit,
  });

  return {
    manufacturers: data?.topManufacturers?.data ?? [],
    isLoading,
    error,
  };
};

export default useTopManufacturers;
