import { GetStaticPathsContext, GetStaticProps } from 'next';
import { SettingsDocument } from '@framework/app/settings.graphql';
import { addApolloState, initializeApollo } from '@framework/utils/apollo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ProductsDocument } from '@framework/products/products.graphql';
import {
  ManufacturerDocument,
  ManufacturersDocument,
} from '@framework/manufacturers/manufacturers.graphql';
import invariant from 'tiny-invariant';
import { getProducts } from '@framework/utils/products';

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: ManufacturersDocument,
    variables: {
      first: 100,
    },
  });
  const paths = data?.manufacturers?.data?.flatMap((manufacturer: any) =>
    locales?.map((locale) => ({
      params: { manufacturer: manufacturer.slug },
      locale,
    }))
  );
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: 'blocking' };
}
// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  invariant(params?.manufacturer, 'slug is required');
  const apolloClient = initializeApollo();
  const { manufacturer } = params;
  await apolloClient.query({
    query: SettingsDocument,
  });
  const { data } = await apolloClient.query({
    query: ManufacturerDocument,
    variables: { slug: manufacturer },
  });

  await apolloClient.query({
    query: ProductsDocument,
    variables: getProducts({
      limit: 30,
      manufacturer: manufacturer.toString(),
    }),
  });
  if (!data?.manufacturer) {
    return {
      notFound: true,
    };
  }
  return addApolloState(apolloClient, {
    props: {
      manufacturer: data.manufacturer,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 120,
  });
};
