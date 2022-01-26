import { getLayout as getSiteLayout } from '@components/layouts/layout';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Search from '@components/ui/search/search';
import AuthorsGrid from '@components/author/authors-grid';
export { getStaticProps } from '@framework/ssr/authors';

export default function AuthorsPage() {
  const { t } = useTranslation('common');
  return (
    <React.Fragment>
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl text-accent font-bold">
          {t('text-search-authors-title')}
        </h1>
        <p className="text-base text-heading">
          {t('text-search-authors-subtitle')}
        </p>

        <div className="w-full max-w-screen-md mt-12">
          <Search
            variant="minimal"
            label="search"
            placeholder={t('text-search-author')}
          />
        </div>
      </div>
      <AuthorsGrid />
    </React.Fragment>
  );
}

const getLayout = (page: React.ReactElement) =>
  getSiteLayout(
    <div className="bg-light w-full">
      <div className="max-w-1920 mx-auto py-10 px-5 xl:py-14 xl:px-16 min-h-screen">
        {page}
      </div>
    </div>
  );

AuthorsPage.getLayout = getLayout;
