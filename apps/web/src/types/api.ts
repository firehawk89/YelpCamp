export type ApiResponse<T> = Promise<{
  result?: T;
  error?: string | string[];
}>;

export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

export interface BasePaginationMetadata {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T, M extends BasePaginationMetadata = BasePaginationMetadata> {
  data: T[];
  metadata: M;
}

export type CustomPaginatedApiResponse<T, M extends BasePaginationMetadata> = ApiResponse<PaginatedResponse<T, M>>;

export type PaginatedApiResponse<T> = CustomPaginatedApiResponse<T, BasePaginationMetadata>;

export type SortOrder = 'asc' | 'desc';

export interface SortOptions {
  sortBy?: string;
  sortOrder?: SortOrder;
}
