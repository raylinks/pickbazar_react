import { useGroupsQuery } from './groups.graphql';

const useGroups = () => {
  const { data, loading, error } = useGroupsQuery();
  return {
    groups: data?.types ?? [],
    isLoading: loading,
    error,
  };
};

export default useGroups;
