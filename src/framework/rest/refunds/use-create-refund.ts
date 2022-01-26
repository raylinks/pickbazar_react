import { useModalAction } from '@components/ui/modal/modal.context';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useCreateRefundMutation } from './refunds.query';

const useCreateRefund = () => {
  const { t } = useTranslation();
  const { closeModal } = useModalAction();
  const queryClient = useQueryClient();
  const { mutate: createRefundRequest, isLoading } = useCreateRefundMutation({
    onSuccess: () => {
      toast.success(t('text-refund-request-submitted'));
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ORDERS);
      closeModal();
    },
  });
  return {
    createRefundRequest,
    isLoading,
  };
};

export default useCreateRefund;
