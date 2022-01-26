import { useTopAuthorsQuery } from './authors.query';

interface UseTopAuthorsProps {
  limit?: number;
}
const useTopAuthors = ({ limit = 15 }: UseTopAuthorsProps = {}) => {
  const { data, isLoading, error } = useTopAuthorsQuery({
    limit,
  });
  return {
    authors: data?.topAuthors?.data ?? [],
    isLoading,
    error,
  };
};

export default useTopAuthors;
