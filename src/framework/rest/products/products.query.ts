import {
  QueryParamsType,
  ProductsQueryOptionsType,
  Product,
  PaginatorInfo,
} from '@framework/types';
import { BaseService, RequestParams } from '@framework/utils/base-service';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { mapPaginatorData } from '@framework/utils/data-mappers';
import {
  QueryKey,
  QueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from 'react-query';
class ProductService extends BaseService {
  getPopularProducts(params: any) {
    return this.get(
      `${API_ENDPOINTS.POPULAR_PRODUCTS}?type_slug=${params.type_slug}&limit=${
        params.limit
      }&with=${params.fields?.join(';')}&range=${params.range}`
    );
  }
  getDownloadableProducts(params: any) {
    return this.get(`${API_ENDPOINTS.DOWNLOADS}&page=1&limit=${params.limit}`);
  }
}
const productService = new ProductService(API_ENDPOINTS.PRODUCTS);

type PaginatedProduct = {
  data: Product[];
  paginatorInfo: PaginatorInfo;
};

export const fetchProducts = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedProduct> => {
  const params = queryKey[1] as RequestParams;
  let fetchedData: any = {};
  if (pageParam) {
    fetchedData = await productService.get(pageParam);
  } else {
    fetchedData = await productService.find(params);
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};
export const useProductsQuery = (
  params: ProductsQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedProduct,
    Error,
    PaginatedProduct,
    PaginatedProduct,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, params],
    fetchProducts,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export const fetchProduct = (slug: string) => {
  return productService.findOne(slug);
};
export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCTS, slug], () =>
    fetchProduct(slug)
  );
};

export const fetchPopularProducts = async ({ queryKey }: QueryParamsType) => {
  const params = queryKey[1] as RequestParams;
  const data = await productService.getPopularProducts(params);
  return { popularProducts: { data } };
};
export const usePopularProductsQuery = (options: any) => {
  return useQuery<{ popularProducts: { data: Product[] } }, Error>(
    [API_ENDPOINTS.POPULAR_PRODUCTS, options],
    fetchPopularProducts
  );
};

export const fetchDownloadableProducts = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedProduct> => {
  const params = queryKey[1] as RequestParams;
  let fetchedData: any = {};
  if (pageParam) {
    fetchedData = await productService.get(pageParam);
  } else {
    fetchedData = await productService.getDownloadableProducts(params);
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};
export const useDownloadableProductsQuery = (
  params: ProductsQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedProduct,
    Error,
    PaginatedProduct,
    PaginatedProduct,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.DOWNLOADS, params],
    fetchDownloadableProducts,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export const useGenerateDownloadableUrlMutation = (
  options: UseMutationOptions
) => {
  return useMutation(
    (input: any) =>
      productService.post(API_ENDPOINTS.DOWNLOADABLE_PRODUCTS, input),
    { ...options }
  );
};
