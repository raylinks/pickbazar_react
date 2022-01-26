import Card from '@components/ui/cards/card';
import { useTranslation } from 'next-i18next';
import DashboardSidebar from '@components/dashboard/sidebar';
import { getLayout as getSiteLayout } from '@components/layouts/layout';
import DownloadableProducts from '@components/products/downloadable-products';
import Seo from '@components/seo/seo';
export { getStaticProps } from '@framework/ssr/common';

const DownloadableProductsPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <Card className="w-full shadow-none sm:shadow">
        <h1 className="mb-8 sm:mb-10 text-lg sm:text-xl text-heading font-semibold text-center">
          {t('text-downloads')}
        </h1>
        <DownloadableProducts />
      </Card>
    </>
  );
};
const getLayout = (page: React.ReactElement) =>
  getSiteLayout(
    <div className="min-h-screen transition-colors duration-150 bg-white sm:bg-gray-100">
      <div className="flex flex-col lg:flex-row items-start max-w-1920 w-full mx-auto sm:py-10 sm:px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
        <DashboardSidebar className="flex-shrink-0 hidden lg:block lg:w-80 me-10" />
        {page}
      </div>
    </div>
  );

// DownloadableProductsPage.authenticate = true;

DownloadableProductsPage.getLayout = getLayout;
export default DownloadableProductsPage;
