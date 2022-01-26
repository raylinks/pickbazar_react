import Button from '@components/ui/button';
import NotFound from '@components/ui/not-found';
import { useTranslation } from 'next-i18next';
import rangeMap from '@lib/range-map';
import AuthorLoader from '@components/ui/loaders/author-loader';
import useAuthors from '@framework/authors/use-authors';
import AuthorCard from '@components/ui/author-card';
import ErrorMessage from '@components/ui/error-message';

interface AuthorsGridProps {
  limit?: number;
}
const AuthorsGrid: React.FC<AuthorsGridProps> = ({ limit = 20 }) => {
  const { t } = useTranslation('common');
  const { authors, loadMore, isLoadingMore, isLoading, hasMore, error } =
    useAuthors();
  if (error) return <ErrorMessage message={error.message} />;

  if (!isLoading && !authors.length) {
    return (
      <div className="bg-white min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound text="text-no-authors" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto py-8 lg:py-14 xl:py-20">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 lg:gap-7">
        {isLoading && !authors.length
          ? rangeMap(limit, (i) => (
              <AuthorLoader key={i} uniqueKey={`author-${i}`} />
            ))
          : authors.map((item) => <AuthorCard key={item.id} item={item} />)}
      </div>
      {hasMore && (
        <div className="flex items-center justify-center mt-12 lg:mt-16">
          <Button onClick={loadMore} size="big" loading={isLoadingMore}>
            {t('text-explore-more')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthorsGrid;
