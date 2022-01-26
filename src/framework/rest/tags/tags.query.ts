import {
  QueryParamsType,
  ProductsQueryOptionsType,
  Tag,
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
class TagsService extends BaseService {}
const tagsService = new TagsService(API_ENDPOINTS.TAGS);

type PaginatedTags = {
  data: Tag[];
  paginatorInfo: PaginatorInfo;
};
export const fetchTags = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedTags> => {
  const params = queryKey[1] as RequestParams;
  let fetchedData: any = {};
  if (pageParam) {
    fetchedData = await tagsService.get(pageParam);
  } else {
    fetchedData = await tagsService.find(params);
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

export const useTagsQuery = (
  params: ProductsQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedTags,
    Error,
    PaginatedTags,
    PaginatedTags,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedTags, Error>(
    [API_ENDPOINTS.TAGS, params],
    fetchTags,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export const fetchTag = (slug: string) => {
  return tagsService.findOne(slug);
};

export const useTagQuery = (slug: string) => {
  return useQuery<Tag, Error>([API_ENDPOINTS.TAGS, slug], () => fetchTag(slug));
};
