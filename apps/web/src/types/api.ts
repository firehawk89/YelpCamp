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
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> {
  metadata: PaginationMetadata;
  data: T[];
}

export type PaginatedApiResponse<T> = ApiResponse<PaginatedResponse<T>>;

export type SortOrder = 'asc' | 'desc';

export interface SortOptions {
  sortBy?: string;
  sortOrder?: SortOrder;
}
