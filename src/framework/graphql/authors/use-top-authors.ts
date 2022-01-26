import { useTopAuthorsQuery } from './authors.graphql';

interface UseTopAuthorsProps {
  limit?: number;
}
const useTopAuthors = ({ limit = 15 }: UseTopAuthorsProps = {}) => {
  const { data, loading, error } = useTopAuthorsQuery({
    variables: {
      limit: limit,
    },
  });

  return {
    authors: data?.topAuthors ?? [],
    isLoading: loading,
    error,
  };
};

export default useTopAuthors;
