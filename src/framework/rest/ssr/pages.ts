import { fetchSettings } from '@framework/app/settings.query';
import { fetchCategories } from '@framework/categories/categories.query';
import { fetchGroups, fetchGroup } from '@framework/groups/groups.query';
import {
  fetchPopularProducts,
  fetchProducts,
} from '@framework/products/products.query';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { GetStaticPathsContext, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import invariant from 'tiny-invariant';
// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { types } = await fetchGroups();

  const paths = types?.flatMap((type: any) =>
    locales?.map((locale) => ({ params: { pages: [type.slug] }, locale }))
  );
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths: paths.concat(
      locales?.map((locale) => ({ params: { pages: [] }, locale }))
    ),
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  invariant(params, 'params is required');
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(API_ENDPOINTS.SETTINGS, fetchSettings);
  const { types } = await fetchGroups();
  const homePage =
    types?.find((type: any) => type?.settings?.isHome)?.slug ??
    types?.[0]?.slug;
  const pageType = Array.isArray(params?.pages) ? params.pages[0] : homePage;
  await queryClient.prefetchInfiniteQuery(
    [
      API_ENDPOINTS.PRODUCTS,
      { type: pageType, limit: 30, fields: ['type', 'author'] },
    ],
    fetchProducts
  );
  await queryClient.prefetchQuery([API_ENDPOINTS.TYPE, pageType], () =>
    fetchGroup(pageType)
  );
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.POPULAR_PRODUCTS,
      { type_slug: pageType, limit: 8, fields: ['type', 'author'] },
    ],
    fetchPopularProducts
  );
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.CATEGORIES,
      {
        type: pageType,
        limit: 1000,
        parent:
          types?.find((t) => t?.slug === pageType)?.settings?.layoutType ===
          'minimal'
            ? 'all'
            : 'null',
      },
    ],
    fetchCategories
  );
  await queryClient.prefetchQuery(API_ENDPOINTS.TYPE, fetchGroups);

  await queryClient.prefetchQuery([API_ENDPOINTS.TYPE, pageType], () =>
    fetchGroup(pageType)
  );

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'banner'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 120,
  };
};

/* Fix : locales: 14kB,
popularProducts: 30kB,
category: 22kB,
groups: 8kB,
group: 2kB,
settings: 2kB,
perProduct: 4.2 * 30 = 120kB,
total = 14 + 30 + 22 + 8 + 2 + 2 + 120 = 198kB 
others: 225 - 198 = 27kB

 */
