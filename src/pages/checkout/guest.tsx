import { useTranslation } from 'next-i18next';
import {
  billingAddressAtom,
  clearCheckoutAtom,
  shippingAddressAtom,
} from '@store/checkout';
import dynamic from 'next/dynamic';
import { getLayout } from '@components/layouts/layout';
import useUser from '@framework/auth/use-user';
import { AddressType } from '@framework/utils/constants';
import Seo from '@components/seo/seo';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
export { getStaticProps } from '@framework/ssr/common';

const ScheduleGrid = dynamic(
  () => import('@components/checkout/schedule/schedule-grid'),
  { ssr: false }
);
const GuestAddressGrid = dynamic(
  () => import('@components/checkout/address-grid-guest')
);
const ContactGrid = dynamic(
  () => import('@components/checkout/contact/contact-grid')
);
const RightSideView = dynamic(
  () => import('@components/checkout/right-side-view'),
  { ssr: false }
);

export default function GuestCheckoutPage() {
  // const { me } = useUser();
  const { t } = useTranslation();
  const [, resetCheckout] = useAtom(clearCheckoutAtom);
  const [billingAddress] = useAtom(billingAddressAtom);
  const [shippingAddress] = useAtom(shippingAddressAtom);
  useEffect(() => {
    resetCheckout();
  }, [resetCheckout]);

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="px-4 py-8 bg-gray-100 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="flex flex-col items-center w-full max-w-5xl m-auto lg:flex-row lg:items-start lg:space-s-8">
          <div className="w-full space-y-6 lg:max-w-2xl">
            <ContactGrid
              className="p-5 shadow-700 bg-light md:p-8"
              //@ts-ignore
              contact=""
              label={t('text-contact-number')}
              count={1}
            />

            <GuestAddressGrid
              // userId={me?.id!}
              className="p-5 shadow-700 bg-light md:p-8"
              label={t('text-billing-address')}
              count={2}
              //@ts-ignore
              addresses={billingAddress ? [billingAddress] : []}
              atom={billingAddressAtom}
              type={AddressType.Billing}
            />
            <GuestAddressGrid
              // userId={me?.id!}
              className="p-5 shadow-700 bg-light md:p-8"
              label={t('text-shipping-address')}
              count={3}
              //@ts-ignore
              addresses={shippingAddress ? [shippingAddress] : []}
              atom={shippingAddressAtom}
              type={AddressType.Shipping}
            />
            <ScheduleGrid
              className="p-5 shadow-700 bg-light md:p-8"
              label={t('text-delivery-schedule')}
              count={4}
            />
          </div>
          <div className="w-full mt-10 mb-10 lg:w-96 sm:mb-12 lg:mb-0">
            <RightSideView />
          </div>
        </div>
      </div>
    </>
  );
}
GuestCheckoutPage.getLayout = getLayout;
