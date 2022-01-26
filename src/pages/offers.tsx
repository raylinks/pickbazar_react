import Coupons from '@components/coupons/grid-with-loader';
import { getLayout } from '@components/layouts/layout';
import Seo from '@components/seo/seo';
export { getStaticProps } from '@framework/ssr/common';

export default function OfferPage() {
  return (
    <>
      <Seo title="Offers" url="offers" />
      <Coupons />
    </>
  );
}

OfferPage.getLayout = getLayout;
