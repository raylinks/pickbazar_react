import { GetStaticProps } from 'next';
import { SettingsDocument } from '@framework/app/settings.graphql';
import { GroupsDocument } from '@framework/groups/groups.graphql';
import { addApolloState, initializeApollo } from '@framework/utils/apollo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ManufacturersDocument } from '@framework/manufacturers/manufacturers.graphql';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SettingsDocument,
  });
  await apolloClient.query({
    query: GroupsDocument,
  });
  await apolloClient.query({
    query: ManufacturersDocument,
    variables: {
      first: 30,
    },
  });
  return addApolloState(apolloClient, {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  });
};
