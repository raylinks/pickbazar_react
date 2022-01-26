import { GetStaticPathsContext, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import invariant from 'tiny-invariant';
import {
  fetchManufacturer,
  fetchManufacturers,
} from '@framework/manufacturers/manufacturers.query';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { QueryClient } from 'react-query';
import { fetchSettings } from '@framework/app/settings.query';
import { fetchGroups } from '@framework/groups/groups.query';
import { dehydrate } from 'react-query/hydration';
import { fetchProducts } from '@framework/products/products.query';

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { data } = await fetchManufacturers({
    queryKey: [API_ENDPOINTS.MANUFACTURERS, { limit: 100 }],
  });
  const paths = data?.flatMap((manufacturer: any) =>
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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(API_ENDPOINTS.SETTINGS, fetchSettings);
  await queryClient.prefetchQuery(API_ENDPOINTS.TYPE, fetchGroups);

  try {
    const manufacturer = await fetchManufacturer(
      params.manufacturer.toString()
    );
    await queryClient.prefetchInfiniteQuery(
      [API_ENDPOINTS.PRODUCTS, { manufacturer: params.manufacturer }],
      fetchProducts,
      {
        staleTime: 60 * 1000,
      }
    );
    return {
      props: {
        manufacturer,
        ...(await serverSideTranslations(locale!, ['common'])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
