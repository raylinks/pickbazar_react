import { useModalAction } from '@components/ui/modal/modal.context';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useCreateRefundMutation } from './refunds.graphql';

const useCreateRefund = () => {
  const { t } = useTranslation();
  const { closeModal } = useModalAction();
  const [refundRequest, { loading }] = useCreateRefundMutation({
    refetchQueries: ['Orders'],
    onCompleted: () => {
      toast.success(t('text-refund-request-submitted'));
      closeModal();
    },
  });

  function createRefundRequest(input: any) {
    refundRequest({
      variables: {
        input,
      },
    });
  }

  return {
    createRefundRequest,
    isLoading: loading,
  };
};

export default useCreateRefund;
