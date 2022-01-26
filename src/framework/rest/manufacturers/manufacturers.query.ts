import {
  QueryParamsType,
  ProductsQueryOptionsType,
  Manufacturer,
  PaginatorInfo,
} from '@framework/types';
import { BaseService, RequestParams } from '@framework/utils/base-service';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { mapPaginatorData } from '@framework/utils/data-mappers';
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
} from 'react-query';
class ManufacturersService extends BaseService {
  getTopManufacturers(params: any) {
    return this.get(`${API_ENDPOINTS.TOP_MANUFACTURERS}?limit=${params.limit}`);
  }
}
const manufacturersService = new ManufacturersService(
  API_ENDPOINTS.MANUFACTURERS
);

type PaginatedManufacturers = {
  data: Manufacturer[];
  paginatorInfo: PaginatorInfo;
};
export const fetchManufacturers = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedManufacturers> => {
  const params = queryKey[1] as RequestParams;
  let fetchedData: any = {};
  if (pageParam) {
    fetchedData = await manufacturersService.get(pageParam);
  } else {
    fetchedData = await manufacturersService.find(params);
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

export const useManufacturersQuery = (
  params: ProductsQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedManufacturers,
    Error,
    PaginatedManufacturers,
    PaginatedManufacturers,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedManufacturers, Error>(
    [API_ENDPOINTS.MANUFACTURERS, params],
    fetchManufacturers,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export const fetchManufacturer = (slug: string) => {
  return manufacturersService.findOne(slug);
};

export const useManufacturerQuery = (slug: string) => {
  return useQuery<Manufacturer, Error>(
    [API_ENDPOINTS.MANUFACTURERS, slug],
    () => fetchManufacturer(slug)
  );
};
export const fetchTopManufacturers = async ({ queryKey }: QueryParamsType) => {
  const params = queryKey[1] as RequestParams;
  const data = await manufacturersService.getTopManufacturers(params);
  return { topManufacturers: { data } };
};

export const useTopManufacturersQuery = (options: any) => {
  return useQuery<{ topManufacturers: { data: Manufacturer[] } }, Error>(
    [API_ENDPOINTS.TOP_MANUFACTURERS, options],
    fetchTopManufacturers
  );
};
