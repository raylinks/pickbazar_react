import { getLayout as getSiteLayout } from '@components/layouts/layout';
import Details from '@components/author/details/details';
import { useWindowSize } from '@lib/use-window-size';
import dynamic from 'next/dynamic';
import ProductsGrid from '@components/products/grid';
import { useTranslation } from 'react-i18next';
export { getStaticPaths, getStaticProps } from '@framework/ssr/author';

const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);

export default function Author({ author }: any) {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  return (
    <>
      <div className="max-w-screen-xl mx-auto min-h-screen">
        <Details author={author} />
        <h2 className="text-2xl lg:text-3xl text-heading tracking-tight font-semibold mb-8">
          {t('text-author-books')}
        </h2>
        <ProductsGrid gridClassName="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 md:gap-8" />
      </div>
      {width > 1023 && <CartCounterButton />}
    </>
  );
}

const getLayout = (page: React.ReactElement) =>
  getSiteLayout(
    <div className="bg-light w-full">
      <div className="max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-16 min-h-screen">
        {page}
      </div>
    </div>
  );
Author.getLayout = getLayout;
