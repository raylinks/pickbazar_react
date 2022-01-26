import useGroup from '@framework/groups/use-group';
import dynamic from 'next/dynamic';
const ErrorMessage = dynamic(() => import('@components/ui/error-message'));
const BannerWithSearch = dynamic(
  () => import('@components/banners/banner-with-search')
);
const BannerShort = dynamic(() => import('@components/banners/banner-short'));
const BannerWithoutSlider = dynamic(
  () => import('@components/banners/banner-without-slider')
);
const BannerWithPagination = dynamic(
  () => import('@components/banners/banner-with-pagination')
);
const MAP_BANNER_TO_GROUP: Record<string, any> = {
  classic: BannerWithSearch,
  modern: BannerShort,
  minimal: BannerWithoutSlider,
  standard: BannerWithSearch,
  compact: BannerWithPagination,
  default: BannerWithSearch,
};

const Banner: React.FC<{ layout: string }> = ({ layout }) => {
  const { group, error } = useGroup();
  if (error) return <ErrorMessage message={error.message} />;
  const Component = MAP_BANNER_TO_GROUP[layout];
  return (
    <Component banners={group?.banners} layout={layout} slug={group?.slug} />
  );
};

export default Banner;
