import pickBy from 'lodash/pickBy';
import AxiosInstance from './request';
type NumberOrString = number | string;
interface QueryParamsOptions {
  limit: number;
  page: number;
  search: string;
  orderBy?: string;
  sortedBy?: string; /// asc or desc
  parent?: string;
  fields?: string[];
}
interface SearchParamsOptions {
  type: string;
  name: string;
  categories: string;
  tags: string;
  author: string;
  price: string;
  manufacturer: string;
  status: string;
  is_active: string;
  shop_id: string;
}
export type RequestParams = Partial<QueryParamsOptions> &
  Partial<SearchParamsOptions>;

// const responseBody = (response: AxiosResponse) => response.data;
export class BaseService {
  protected readonly http = AxiosInstance;
  constructor(protected readonly basePath: string) {}

  findAll() {
    return this.http.get(this.basePath);
  }
  find(params: RequestParams) {
    const {
      limit = 30,
      page = 1,
      parent,
      fields,
      orderBy,
      sortedBy,
      ...restParams
    } = params;
    const search = this.formatSearchString({
      ...restParams,
    });
    const queryString = this.formatSearchParams({
      limit,
      page,
      search,
      parent,
      fields,
      orderBy,
      sortedBy,
    });
    return this.http
      .get(`${this.basePath}?${queryString}`)
      .then((res) => res.data);
  }

  findOne(id: NumberOrString) {
    return this.http.get(`${this.basePath}/${id}`).then((res) => res.data);
  }
  create(data: any, options?: any) {
    return this.http.post(this.basePath, data, options).then((res) => res.data);
  }
  update(id: NumberOrString, data: any) {
    return this.http
      .put(`${this.basePath}/${id}`, data)
      .then((res) => res.data);
  }
  delete(id: NumberOrString) {
    return this.http.delete(`${this.basePath}/${id}`);
  }
  // get<T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<T>): Promise<R>;
  get(url: string, options: any = {}) {
    return this.http.get(url, options).then((res) => res.data);
  }
  post(url: string, data: any) {
    return this.http.post(url, data);
  }
  put(url: string, data: any) {
    return this.http.put(url, data);
  }

  private formatSearchParams({
    limit,
    page,
    search,
    parent,
    fields,
    orderBy,
    sortedBy,
  }: QueryParamsOptions) {
    return new URLSearchParams({
      searchJoin: 'and',
      page: page.toString(),
      limit: limit.toString(),
      ...(Boolean(parent) && { parent }),
      ...(Boolean(sortedBy) && { sortedBy }),
      ...(Boolean(orderBy) && { orderBy }),
      ...(Boolean(search) && { search }),
      ...(Boolean(fields) && { with: fields?.join(';') }),
    }).toString();
  }
  private formatSearchString(values: Partial<SearchParamsOptions>) {
    const parsedValues = pickBy(values);
    return Object.keys(parsedValues)
      .map((k) => {
        if (
          ['type', 'categories', 'tags', 'author', 'manufacturer'].includes(k)
        ) {
          return `${k}.slug:${parsedValues[k]}`;
        }
        return `${k}:${parsedValues[k]}`;
      })
      .join(';');
  }
}
