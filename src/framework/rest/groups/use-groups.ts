import { useGroupsQuery } from './groups.query';

const useGroups = () => {
  const { data, isLoading, error } = useGroupsQuery();
  return {
    groups: data?.types ?? [],
    isLoading,
    error,
  };
};

export default useGroups;
