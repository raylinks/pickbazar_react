import { formatOrderedProduct } from '@lib/format-ordered-product';
import { useState } from 'react';
import ValidationError from '@components/ui/validation-error';
import omit from 'lodash/omit';
import { useVerifyCheckoutMutation } from '@framework/checkout/checkout.graphql';
import { useAtom } from 'jotai';
import {
  billingAddressAtom,
  shippingAddressAtom,
  verifiedResponseAtom,
} from '@store/checkout';
import Button from '@components/ui/button';
import { useCart } from '@store/quick-cart/cart.context';
import { useTranslation } from 'next-i18next';

export const CheckAvailabilityAction: React.FC = (props) => {
  const { t } = useTranslation('common');

  const [billing_address] = useAtom(billingAddressAtom);
  const [shipping_address] = useAtom(shippingAddressAtom);
  const [_, setVerifiedResponse] = useAtom(verifiedResponseAtom);

  const [errorMessage, setError] = useState('');
  const { items, total, isEmpty } = useCart();

  const [verifyCheckout, { loading }] = useVerifyCheckoutMutation({
    onCompleted: (data) => {
      //@ts-ignore
      setVerifiedResponse(data.verifyCheckout);
    },
    onError: (error) => {
      setError(error?.message);
    },
  });

  function handleVerifyCheckout() {
    const isDigitalCheckout = items.find((item) => Boolean(item.is_digital));
    if (!isDigitalCheckout) {
      if (!billing_address && !shipping_address) {
        setError('error-add-both-address');
        return;
      }
    }
    verifyCheckout({
      variables: {
        amount: total,
        products: items?.map((item) => formatOrderedProduct(item)),
        billing_address: {
          ...(billing_address?.address &&
            omit(billing_address.address, ['__typename'])),
        },
        shipping_address: {
          ...(shipping_address?.address &&
            omit(shipping_address.address, ['__typename'])),
        },
      },
    });
  }
  console.log(isEmpty, items);
  return (
    <>
      <Button
        loading={loading}
        className="w-full mt-5"
        onClick={handleVerifyCheckout}
        disabled={isEmpty}
        {...props}
      />
      {errorMessage && (
        <div className="mt-3">
          <ValidationError message={t(errorMessage)} />
        </div>
      )}
    </>
  );
};
