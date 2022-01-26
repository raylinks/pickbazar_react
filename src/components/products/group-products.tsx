import { Image } from '@components/ui/image';
import Link from '@components/ui/link';
import useProducts from '@framework/products/use-products';
import { isEven } from '@lib/is-even';
import { productPlaceholder } from '@lib/placeholders';
import ErrorMessage from '@components/ui/error-message';
import SectionBlock from '@components/ui/section-block';
import { ROUTES } from '@lib/routes';

const GroupProducts: React.FC = () => {
  const { products, error } = useProducts({
    tags: 'combo',
    limit: 3,
  });
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SectionBlock>
      <div className="w-full grid sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {/* <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-5"> */}
        {products.slice(0, 3).map((product, idx) => {
          return (
            <Link
              href={`${ROUTES.PRODUCT}/${product.slug}`}
              className="lg:even:col-span-2 w-full bg-gray-100 relative grid"
              key={product.id}
            >
              <Image
                src={product.image?.original ?? productPlaceholder}
                alt="Advertisement image"
                width={isEven(idx) ? 960 : 1560}
                height={960}
                layout="responsive"
                className="rounded-lg lg:rounded-2xl"
              />
            </Link>
          );
        })}
      </div>
    </SectionBlock>
  );
};

export default GroupProducts;
