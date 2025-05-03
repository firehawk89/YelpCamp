export type ApiResponse<T> = Promise<{
  result?: T;
  error?: string | string[];
}>;

export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

export interface PaginationMetadata {
  page: number;
  totalPages: number;
  limit: number;
  offset: number;
  totalCount: number;
  count: number;
}

export interface PaginatedResponse<T, M extends PaginationMetadata = PaginationMetadata> {
  data: T[];
  metadata: M;
}

export type CustomPaginatedApiResponse<T, M extends PaginationMetadata> = ApiResponse<PaginatedResponse<T, M>>;

export type PaginatedApiResponse<T> = CustomPaginatedApiResponse<T, PaginationMetadata>;

export type SortOrder = 'asc' | 'desc';
