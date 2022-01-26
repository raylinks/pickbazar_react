import ErrorMessage from '@components/ui/error-message';
import dynamic from 'next/dynamic';
import useCategories from '@framework/categories/use-categories';

const StickySidebarListCategories = dynamic(
  () => import('@components/categories/sticky-sidebar-list-categories')
);
const StaticSidebarVerticalRectangleCategories = dynamic(
  () => import('@components/categories/sliding-vertical-rectangle-categories')
);
const StickySidebarBoxedCategories = dynamic(
  () => import('@components/categories/sticky-sidebar-boxed-categories')
);
const FilterCategoryGrid = dynamic(
  () => import('@components/categories/filter-category-grid')
);
const SlidingCardCategories = dynamic(
  () => import('@components/categories/sliding-card-category')
);
const MAP_CATEGORY_TO_GROUP: Record<string, any> = {
  classic: StickySidebarListCategories,
  modern: StickySidebarBoxedCategories,
  standard: StaticSidebarVerticalRectangleCategories,
  minimal: FilterCategoryGrid,
  compact: SlidingCardCategories,
  default: StickySidebarListCategories,
};

const Categories: React.FC<{ layout: string; className?: string }> = ({
  layout,
  className,
}) => {
  const { categories, isLoading, error } = useCategories({ layout });

  if (error) return <ErrorMessage message={error.message} />;
  const Component = layout
    ? MAP_CATEGORY_TO_GROUP[layout]
    : MAP_CATEGORY_TO_GROUP['default'];
  return (
    <Component
      notFound={!Boolean(categories.length)}
      categories={categories}
      loading={isLoading}
      className={className}
    />
  );
};

export default Categories;
