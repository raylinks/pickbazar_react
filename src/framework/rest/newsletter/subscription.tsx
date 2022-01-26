import SubscriptionWidgetForm from '@components/ui/subscription-widget';
import { useState } from 'react';
import { useSubscribeToNewsletterMutation } from '@framework/auth/auth.query';

type Props = {
  title: string;
  description?: string;
  onSubmit?: (formData: any) => void;
};
const SubscriptionWidget: React.FC<Props> = ({ title, description }) => {
  const [success, setSuccess] = useState(false);
  const { mutate: subscribeToNewsletter, isLoading: loading } =
    useSubscribeToNewsletterMutation();
  function onSubmit({ email }: any) {
    subscribeToNewsletter(email, {
      onSuccess: () => {
        setSuccess(true);
      },
      onError: () => {
        setSuccess(false);
      },
    });
  }
  return (
    <SubscriptionWidgetForm
      onSubmit={onSubmit}
      title={title}
      description={description}
      loading={loading}
      success={success}
    />
  );
};

export default SubscriptionWidget;
