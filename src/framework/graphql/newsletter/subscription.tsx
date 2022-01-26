import SubscriptionWidgetForm from '@components/ui/subscription-widget';
import { useSubscribeToNewsletterMutation } from '@framework/auth/auth.graphql';
import { useState } from 'react';

type Props = {
  title: string;
  description?: string;
  onSubmit: (formData: any) => void;
};
const SubscriptionWidget: React.FC<Props> = ({ title, description }) => {
  const [success, setSuccess] = useState(false);
  const [subscribeToNewsletter, { loading }] = useSubscribeToNewsletterMutation(
    {
      onCompleted: () => {
        setSuccess(true);
      },
      onError: () => {
        setSuccess(false);
      },
    }
  );
  function onSubmit(formData: any) {
    subscribeToNewsletter({ variables: { email: formData.email } });
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
