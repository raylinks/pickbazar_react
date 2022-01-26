import useHomepage from '@framework/utils/use-homepage';
import { useRouter } from 'next/router';
import { useGroupQuery } from './groups.graphql';
import { useMemo } from 'react';
const useGroup = () => {
  const router = useRouter();
  const { homePage } = useHomepage();
  const group = useMemo(
    () => router.query.pages?.[0] ?? homePage?.slug,
    [router.query.pages, homePage]
  );
  const { data, isLoading, error } = useGroupQuery({
    variables: {
      slug: group?.toString()!,
    },
  });
  return {
    group: data?.type,
    isLoading,
    error,
  };
};

export default useGroup;
