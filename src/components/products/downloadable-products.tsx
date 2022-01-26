import ErrorMessage from '@components/ui/error-message';
import { Table } from '@components/ui/table';
import useGenerateDownloadableUrl from '@framework/products/use-generate-downloadable-url';
import useDownloadableProducts from '@framework/products/use-downloadable-products';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';
import Link from '@components/ui/link';
import { ROUTES } from '@lib/routes';
import Button from '@components/ui/button';
import { productPlaceholder } from '@lib/placeholders';
import { isEmpty } from 'lodash';
import NotFound from '@components/ui/not-found';

const DownloadableProducts: React.FC = () => {
  const { t } = useTranslation('common');
  const { downloads, error, loadMore, isLoading, hasMore } =
    useDownloadableProducts();

  const { generateDownloadableUrl } = useGenerateDownloadableUrl();

  if (error) return <ErrorMessage message={error.message} />;
  const isVariableProduct = (product: any) =>
    !isEmpty(product.file.fileable.product);
  return (
    <>
      {!downloads.length && (
        <NotFound
          text="text-no-download"
          className="w-full md:w-7/12 mx-auto"
        />
      )}
      {downloads.map((item) => (
        <div
          key={item.purchase_key}
          className="flex w-full space-s-4 sm:space-s-5 border-b border-gray-200 py-5 first:pt-0 last:pb-0 last:border-0"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative flex-shrink-0">
            <Image
              src={
                isVariableProduct(item)
                  ? item?.file?.fileable?.product?.image?.original!
                  : item?.file?.fileable?.image?.original! ?? productPlaceholder
              }
              alt="text"
              layout="fill"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:justify-between w-full sm:space-s-4">
            <div className="w-full flex flex-col sm:items-start space-y-1">
              <Link
                href={`${ROUTES.PRODUCT}/${
                  isVariableProduct(item)
                    ? item?.file?.fileable?.product?.slug
                    : item?.file?.fileable?.slug
                }`}
                className="text-base font-semibold text-heading transition-colors hover:text-accent"
              >
                {!isVariableProduct(item) && item?.file?.fileable?.name}
                {isVariableProduct(item) && (
                  <>
                    {item?.file?.fileable?.product?.name}
                    <span className="text-sm clear-left ms-1 inline-block">
                      ({item?.file?.fileable?.title})
                    </span>
                  </>
                )}
              </Link>

              <p className="sm:space-s-1 space-y-1 sm:space-y-0">
                <span className="block sm:inline-block sm:w-auto text-sm font-semibold text-body-dark">
                  {t('text-key')}: {item?.purchase_key}
                </span>
                <span className="hidden sm:inline-block text-sm text-body">
                  |
                </span>
                <span className="block sm:inline-block text-sm text-body">
                  {t('text-purchased-on')}{' '}
                  {dayjs(item?.created_at).format('DD.MM.YYYY')}
                </span>
              </p>
            </div>

            <button
              className="mt-2 sm:mt-0 text-sm text-accent font-semibold transition-colors hover:text-accent-hover"
              onClick={() => generateDownloadableUrl(item?.digital_file_id)}
            >
              {t('text-download')}
            </button>
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="flex w-full justify-center mt-8">
          <Button loading={isLoading} onClick={loadMore}>
            {t('text-load-more')}
          </Button>
        </div>
      )}
    </>
  );
};

export default DownloadableProducts;
