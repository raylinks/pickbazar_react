import {
  Maybe,
  ProductStatus,
  QueryCategoriesHasTypeColumn,
  QueryProductsHasAuthorColumn,
  QueryProductsHasManufacturerColumn,
  QueryProductsHasTagsColumn,
  QueryProductsHasTypeColumn,
  QueryProductsOrderByColumn,
  SortOrder,
  SqlOperator,
} from '__generated__/__types__';
export interface IGetProducts {
  type?: Maybe<string>;
  limit: number;
  text?: string;
  shopId?: number;
  category?: string;
  author?: string;
  page?: number;
  status?: ProductStatus;
  orderField?: QueryProductsOrderByColumn;
  sortOrder?: SortOrder;
  manufacturer?: string;
  tags?: string;
  priceRange?: string;
}

export const getProducts = ({
  type,
  limit,
  text,
  category,
  shopId,
  priceRange,
  manufacturer,
  author,
  tags,
  page = 1,
  status = ProductStatus.Publish,
  orderField = QueryProductsOrderByColumn.CreatedAt,
  sortOrder = SortOrder.Asc,
}: IGetProducts) => {
  return {
    ...(!shopId &&
      !author &&
      !manufacturer &&
      type && {
        hasType: {
          column: QueryProductsHasTypeColumn.Slug,
          operator: SqlOperator.Eq,
          value: type,
        },
      }),
    ...(shopId && { shop_id: shopId }),
    ...(text && { text: `%${text}%` }),
    ...(category && {
      hasCategories: {
        column: QueryCategoriesHasTypeColumn.Slug,
        operator: SqlOperator.In,
        value: category.split(','),
      },
    }),
    ...(manufacturer && {
      hasManufacturer: {
        column: QueryProductsHasManufacturerColumn.Slug,
        operator: SqlOperator.In,
        value: manufacturer.split(','),
      },
    }),
    ...(tags && {
      hasTags: {
        column: QueryProductsHasTagsColumn.Slug,
        operator: SqlOperator.In,
        value: tags.split(','),
      },
    }),
    ...(author && {
      hasAuthor: {
        column: QueryProductsHasAuthorColumn.Slug,
        operator: SqlOperator.In,
        value: author.split(','),
      },
    }),
    ...(orderField && {
      orderBy: [{ column: orderField.toUpperCase(), order: sortOrder }],
    }),
    page,
    status,
    first: limit,
    ...(priceRange && {
      min_price: {
        from: +priceRange.split(',')[0],
        to: +priceRange.split(',')[1],
      },
    }),
  };
};
