import {
  QueryParamsType,
  ProductsQueryOptionsType,
  Author,
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
class AuthorsService extends BaseService {
  getTopAuthors(params: any) {
    return this.get(`${API_ENDPOINTS.TOP_AUTHORS}?limit=${params.limit}`);
  }
}
const authorsService = new AuthorsService(API_ENDPOINTS.AUTHORS);

type PaginatedAuthors = {
  data: Author[];
  paginatorInfo: PaginatorInfo;
};
export const fetchAuthors = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedAuthors> => {
  const params = queryKey[1] as RequestParams;
  let fetchedData: any = {};
  if (pageParam) {
    fetchedData = await authorsService.get(pageParam);
  } else {
    fetchedData = await authorsService.find(params);
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

export const useAuthorsQuery = (
  params: ProductsQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedAuthors,
    Error,
    PaginatedAuthors,
    PaginatedAuthors,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedAuthors, Error>(
    [API_ENDPOINTS.AUTHORS, params],
    fetchAuthors,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export const fetchAuthor = (slug: string) => {
  return authorsService.findOne(slug);
};

export const useAuthorQuery = (slug: string) => {
  return useQuery<Author, Error>([API_ENDPOINTS.AUTHORS, slug], () =>
    fetchAuthor(slug)
  );
};

export const fetchTopAuthors = async ({ queryKey }: QueryParamsType) => {
  const params = queryKey[1] as RequestParams;
  const data = await authorsService.getTopAuthors(params);
  return { topAuthors: { data } };
};

export const useTopAuthorsQuery = (options: any) => {
  return useQuery<{ topAuthors: { data: Author[] } }, Error>(
    [API_ENDPOINTS.TOP_AUTHORS, options],
    fetchTopAuthors
  );
};
