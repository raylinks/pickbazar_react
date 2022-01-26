import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { getLayout as getSiteLayout } from '@components/layouts/layout';
import useUser from '@framework/auth/use-user';
import Seo from '@components/seo/seo';
import ContactBox from '@components/checkout/contact/contact-box';
export { getStaticProps } from '@framework/ssr/common';

const CheckoutCart = dynamic(
  () => import('@components/checkout/digital/checkout-cart'),
  { ssr: false }
);

const CheckoutDigitalPage = () => {
  const { t } = useTranslation('common');
  const { me } = useUser();

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="px-4 py-8 bg-gray-100 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="flex flex-col w-full max-w-xl m-auto">
          <ContactBox
            label={t('text-contact-number')}
            contact={me?.profile?.contact}
            className="w-full lg:max-w-2xl"
          />
          {/* </div> */}

          <div className="w-full mt-3 bg-white">
            <span className="w-full border-b border-gray-100 block text-lg lg:text-2xl text-gray-800 font-semibold capitalize mb-[1px] py-7 px-8">
              {t('text-your-order')}
            </span>

            <div className="w-full px-8 py-7">
              <CheckoutCart hideTitle={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const getLayout = (page: React.ReactElement) =>
  getSiteLayout(<div className="min-h-screen bg-gray-100">{page}</div>);

CheckoutDigitalPage.authenticate = true;

CheckoutDigitalPage.getLayout = getLayout;
export default CheckoutDigitalPage;
