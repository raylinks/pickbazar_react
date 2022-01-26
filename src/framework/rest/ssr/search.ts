import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import invariant from 'tiny-invariant';
import { QueryClient } from 'react-query';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { fetchSettings } from '@framework/app/settings.query';
import { fetchGroups } from '@framework/groups/groups.query';
import { dehydrate } from 'react-query/hydration';
import { fetchCategories } from '@framework/categories/categories.query';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  invariant(params, 'params is required');
  const { searchType } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(API_ENDPOINTS.SETTINGS, fetchSettings);
  await queryClient.prefetchQuery(API_ENDPOINTS.TYPE, fetchGroups);
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.CATEGORIES,
      {
        type: searchType,
        limit: 1000,
        parent: 'null',
      },
    ],
    fetchCategories,
    {
      staleTime: 60 * 1000,
    }
  );
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
