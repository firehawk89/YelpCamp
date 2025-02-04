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

export type ApiResponse<T> = Promise<{
  result?: T;
  error?: string;
}>;

export type PaginatedApiResponse<T> = ApiResponse<PaginatedResponse<T>>;
