import dynamic from 'next/dynamic';
import ErrorMessage from '@components/ui/error-message';
import useProducts from '@framework/products/use-products';
const AutoSuggestion = dynamic(() => import('@components/ui/auto-suggestion'));

interface AutoSuggestionProps {
  shopId?: string;
  className?: string;
  searchQuery: string;
  visible: boolean;
  seeMore: boolean;
  seeMoreLink: (e: any) => void;
}
const AutoSuggestionBox: React.FC<AutoSuggestionProps> = ({
  shopId,
  searchQuery,
  className,
  visible,
  seeMoreLink,
  seeMore,
}) => {
  const { isLoading, products, error } = useProducts({
    searchQuery,
    shop_id: shopId,
  });

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <AutoSuggestion
      suggestions={products}
      notFound={!isLoading && !products.length}
      visible={visible}
      seeMoreLink={seeMoreLink}
      seeMore={seeMore}
      className={className}
      showLoaders={isLoading && !products.length}
    />
  );
};

export default AutoSuggestionBox;
