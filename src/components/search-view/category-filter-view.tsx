import CheckboxGroup from './checkbox-group';
import { useState, useEffect, useMemo } from 'react';
import Checkbox from '@components/ui/checkbox/checkbox';
import { useRouter } from 'next/router';
import Scrollbar from '@components/ui/scrollbar';
import { useTranslation } from 'react-i18next';
import useCategories from '@framework/categories/use-categories';
import ErrorMessage from '@components/ui/error-message';
import Spinner from '@components/ui/loaders/spinner/spinner';

interface Props {
  categories: any[];
}

const CategoryFilterView = ({ categories }: Props) => {
  const { t } = useTranslation('common');

  const router = useRouter();
  const selectedValues = useMemo(
    () =>
      router.query.category ? (router.query.category as string).split(',') : [],
    [router.query.category]
  );
  const [state, setState] = useState<string[]>(() => selectedValues);
  useEffect(() => {
    setState(selectedValues);
  }, [selectedValues]);

  function handleChange(values: string[]) {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        category: values.join(','),
      },
    });
  }

  return (
    <div className="relative -mb-5 after:h-6 after:w-full after:bg-gradient-to-t after:from-white after:flex after:absolute after:bottom-0 after:start-0">
      <Scrollbar style={{ maxHeight: '400px' }} className="pb-6">
        <span className="sr-only">{t('text-categories')}</span>
        <div className="grid grid-cols-1 gap-4">
          <CheckboxGroup values={state} onChange={handleChange}>
            {categories.map((plan) => (
              <Checkbox
                key={plan.id}
                label={plan.name}
                name={plan.slug}
                value={plan.slug}
                theme="secondary"
              />
            ))}
          </CheckboxGroup>
        </div>
      </Scrollbar>
    </div>
  );
};

const CategoryFilter: React.FC<{ type?: string }> = ({ type }) => {
  const { categories, isLoading, error } = useCategories({
    type,
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full py-5">
        <Spinner className="w-6 h-6" simple={true} />
      </div>
    );
  return <CategoryFilterView categories={categories} />;
};

export default CategoryFilter;
