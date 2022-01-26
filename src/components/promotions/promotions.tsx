import PromotionSlider from '@components/promotions/promotion-slider';
import ErrorMessage from '@components/ui/error-message';
import useGroup from '@framework/groups/use-group';

const PromotionSliders: React.FC = () => {
  const { group, error } = useGroup();

  if (error) return <ErrorMessage message={error.message} />;
  if (!group?.promotional_sliders) return null;
  return <PromotionSlider sliders={group?.promotional_sliders} />;
};

export default PromotionSliders;
