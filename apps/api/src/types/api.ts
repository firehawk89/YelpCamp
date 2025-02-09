interface PaginationMetadata {
  page: number;
  totalPages: number;
  limit: number;
  offset: number;
  totalCount: number;
  count: number;
}

export interface PaginatedResponse<T> {
  metadata: PaginationMetadata;
  data: T[];
}

export type SortOrder = 'asc' | 'desc';
