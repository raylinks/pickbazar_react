import { getLayout } from '@components/layouts/layout';
import ShopsGridWithLoader from '@components/shops/grid-with-loader';
export { getStaticProps } from '@framework/ssr/shops';

export default function ShopsPage() {
  return <ShopsGridWithLoader />;
}

ShopsPage.getLayout = getLayout;
