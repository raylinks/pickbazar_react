import Button from '@components/ui/button';
import { Form } from '@components/ui/forms/form';
import Input from '@components/ui/forms/input';
import Label from '@components/ui/forms/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import { customerContactAtom } from '@store/checkout';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import * as yup from 'yup';

type FormValues = {
  __typename?: string;
  contact: string;
};

const checkoutContactSchema = yup.object().shape({
  contact: yup.string().required('error-contact-required'),
});

const AddOrUpdateCheckoutContactWithoutOtp = () => {
  const { closeModal } = useModalAction();
  const { t } = useTranslation('common');
  const [contactNumber, setContactNumber] = useAtom(customerContactAtom);

  function onContactUpdate({ contact }: { contact: string }) {
    setContactNumber(contact);
    closeModal();
  }
  return (
    <div className="p-5 sm:p-8 bg-light md:rounded-xl min-h-screen flex flex-col justify-center md:min-h-0">
      <h1 className="text-heading font-semibold text-lg text-center mb-4 sm:mb-6">
        {contactNumber ? t('text-update') : t('text-add-new')}{' '}
        {t('text-contact-number')}
      </h1>
      <Form<FormValues>
        onSubmit={onContactUpdate}
        // className="flex items-center"
        validationSchema={checkoutContactSchema}
        options={{
          shouldUnregister: true,
          defaultValues: {
            contact: contactNumber ?? '',
          },
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="flex flex-col">
            <Label>{t('text-contact-number')}</Label>
            <div className="flex items-center md:min-w-[360px]">
              <Input
                {...register('contact')}
                error={t(errors.contact?.message!)}
                variant="outline"
                className="w-full"
                inputClassName="!rounded-e-none"
              />

              <Button className="!rounded-s-none !text-sm">
                {contactNumber ? t('text-update') : t('text-add')}{' '}
                {t('nav-menu-contact')}
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default AddOrUpdateCheckoutContactWithoutOtp;
