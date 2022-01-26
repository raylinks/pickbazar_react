import { SettingsDocument } from '@framework/app/settings.graphql';
import { addApolloState, initializeApollo } from '@framework/utils/apollo';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CategoriesDocument } from '@framework/categories/categories.graphql';
import { getCategories } from '@framework/utils/categories';
import invariant from 'tiny-invariant';
export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  invariant(params, 'params is required');
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SettingsDocument,
  });
  await apolloClient.query({
    query: CategoriesDocument,
    variables: getCategories({
      type: params.searchType?.toString(),
      limit: 1000,
      parent: null,
    }),
  });
  return addApolloState(apolloClient, {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  });
};
