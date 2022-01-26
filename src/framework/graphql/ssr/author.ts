import { GetStaticPathsContext, GetStaticProps } from 'next';
import { SettingsDocument } from '@framework/app/settings.graphql';
import { addApolloState, initializeApollo } from '@framework/utils/apollo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  AuthorDocument,
  AuthorsDocument,
} from '@framework/authors/authors.graphql';
import {
  QueryProductsHasAuthorColumn,
  SqlOperator,
} from '__generated__/__types__';
import { ProductsDocument } from '@framework/products/products.graphql';

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: AuthorsDocument,
    variables: {
      first: 100,
    },
  });
  const paths = data?.authors?.data?.flatMap((author: any) =>
    locales?.map((locale) => ({ params: { author: author.slug }, locale }))
  );
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: 'blocking' };
}
// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const apolloClient = initializeApollo();
  const { author } = params as any;
  await apolloClient.query({
    query: SettingsDocument,
  });
  const { data } = await apolloClient.query({
    query: AuthorDocument,
    variables: { slug: author },
  });
  const {
    data: { products },
  } = await apolloClient.query({
    query: ProductsDocument,
    variables: {
      hasAuthor: {
        column: QueryProductsHasAuthorColumn.Slug,
        operator: SqlOperator.Eq,
        value: author,
      },
    },
  });

  if (!data?.author) {
    return {
      notFound: true,
    };
  }
  return addApolloState(apolloClient, {
    props: {
      author: data.author,
      books: products?.data,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60,
  });
};
