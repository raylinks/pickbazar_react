import { useTranslation } from 'react-i18next';
import MobileOtpInput from 'react-otp-input';
import Button from '@components/ui/button';
import Input from '@components/ui/forms/input';
import Label from '@components/ui/forms/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import { Form } from '@components/ui/forms/form';
import { Controller } from 'react-hook-form';
import * as yup from 'yup';

interface OtpLoginFormProps {
  isContactExist: boolean;
  onSubmit: (formData: any) => void;
  loading: boolean;
}
interface OtpLoginFormForAllUserProps {
  onSubmit: (formData: any) => void;
  loading: boolean;
}
type FormValuesForExistingUser = {
  code: string;
};
const otpLoginFormSchemaForExistingUser = yup.object().shape({
  code: yup.string().required('error-code-required'),
});
const OtpLoginFormForExistingUser: React.FC<OtpLoginFormForAllUserProps> = ({
  onSubmit,
  loading,
}) => {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();

  return (
    <div className="space-y-5 border border-gray-200 rounded p-5">
      <Form<FormValuesForExistingUser>
        onSubmit={onSubmit}
        validationSchema={otpLoginFormSchemaForExistingUser}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <div className="mb-5">
              <Label>{t('text-otp-code')}</Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MobileOtpInput
                    value={value}
                    onChange={onChange}
                    numInputs={6}
                    separator={
                      <span className="hidden sm:inline-block sm:mx-2">-</span>
                    }
                    containerStyle="justify-center space-s-2 sm:space-s-0"
                    inputStyle="flex items-center justify-center !w-full sm:!w-11 appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base rounded focus:border-accent h-12"
                    disabledStyle="!bg-gray-100"
                  />
                )}
                name="code"
                defaultValue=""
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <Button variant="outline" onClick={closeModal}>
                {t('text-cancel')}
              </Button>

              <Button loading={loading} disabled={loading}>
                {t('text-verify-code')}
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
type FormValuesForNewUser = {
  email: string;
  name: string;
  code: string;
};
const otpLoginFormSchemaForNewUser = yup.object().shape({
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
  name: yup.string().required('error-name-required'),
  code: yup.string().required('error-code-required'),
});
const OtpLoginFormForNewUser: React.FC<OtpLoginFormForAllUserProps> = ({
  onSubmit,
  loading,
}) => {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();

  return (
    <div className="space-y-5 border border-gray-200 rounded p-5">
      <Form<FormValuesForNewUser>
        onSubmit={onSubmit}
        validationSchema={otpLoginFormSchemaForNewUser}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <Input
              label={t('text-email')}
              {...register('email')}
              type="email"
              variant="outline"
              className="mb-5"
              error={t(errors.email?.message!)}
            />
            <Input
              label={t('text-name')}
              {...register('name')}
              variant="outline"
              className="mb-5"
              error={t(errors.name?.message!)}
            />

            <div className="mb-5">
              <Label>{t('text-otp-code')}</Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MobileOtpInput
                    value={value}
                    onChange={onChange}
                    numInputs={6}
                    separator={
                      <span className="hidden sm:inline-block sm:mx-2">-</span>
                    }
                    containerStyle="justify-center space-s-2 sm:space-s-0"
                    inputStyle="flex items-center justify-center !w-full sm:!w-11 appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base rounded focus:border-accent h-12"
                    disabledStyle="!bg-gray-100"
                  />
                )}
                name="code"
                defaultValue=""
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <Button variant="outline" onClick={closeModal}>
                {t('text-cancel')}
              </Button>

              <Button loading={loading} disabled={loading}>
                {t('text-verify-code')}
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
function OtpLoginForm({
  isContactExist,
  onSubmit,
  loading,
}: OtpLoginFormProps) {
  return isContactExist ? (
    <OtpLoginFormForExistingUser onSubmit={onSubmit} loading={loading} />
  ) : (
    <OtpLoginFormForNewUser onSubmit={onSubmit} loading={loading} />
  );
}
export default OtpLoginForm;
