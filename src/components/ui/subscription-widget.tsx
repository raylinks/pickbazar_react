import { useTranslation } from 'next-i18next';
import { SendIcon } from '@components/icons/send-icon';
import { Form } from '@components/ui/forms/form';
import * as yup from 'yup';

interface FormProps {
  onSubmit: (formData: any) => void;
  loading?: boolean;
  success?: boolean;
}
type FormValues = {
  email: string;
};

const subscribeFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
});

const SubscriptionForm: React.FC<FormProps> = ({
  onSubmit,
  loading,
  success,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col">
      <Form<FormValues>
        onSubmit={onSubmit}
        validationSchema={subscribeFormSchema}
      >
        {({ register, formState: { errors } }) => (
          <>
            <div className="relative w-full bg-gray-50 border border-gray-200 rounded pe-11">
              <input
                type="email"
                id="email_subscribe"
                {...register('email')}
                placeholder={t('common:text-enter-email')}
                className="text-sm text-body w-full h-14 bg-transparent border-0 outline-none focus:outline-none ps-5"
              />
              <button className="absolute end-3 top-1/2 -mt-2">
                {loading ? (
                  <span
                    className="flex flex-shrink-0 h-5 w-5 text-accent ms-2 rounded-full border-[3px] border-gray-300 border-t-[3px] animate-spin"
                    style={{
                      borderTopColor: 'currentcolor',
                    }}
                  />
                ) : (
                  <SendIcon className="text-gray-500 transition-colors hover:text-accent" />
                )}
              </button>
            </div>
            {errors.email?.message && (
              <div className="text-[13px] mt-1">
                <span className="text-red-500">{t(errors.email.message)}</span>
              </div>
            )}
            {!loading && !errors?.email && success && (
              <div className="text-[13px] mt-1">
                <span className="text-accent">
                  {t('text-subscribe-successfully')}
                </span>
              </div>
            )}
          </>
        )}
      </Form>
    </div>
  );
};

type Props = {
  title: string;
  description?: string;
  onSubmit: (formData: any) => void;
  loading?: boolean;
  success?: boolean;
};
const SubscriptionWidgetForm: React.FC<Props> = ({
  title,
  description,
  onSubmit,
  loading,
  success,
}) => {
  const { t } = useTranslation('common');
  return (
    <div className="flex flex-col">
      <h3 className="text-xl text-heading font-semibold mt-3 mb-7">
        {t(title)}
      </h3>
      <p className="text-sm text-heading mb-7">{t(description!)}</p>
      <SubscriptionForm
        onSubmit={onSubmit}
        loading={loading}
        success={success}
      />
    </div>
  );
};

export default SubscriptionWidgetForm;
