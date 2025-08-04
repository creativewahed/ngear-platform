export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: string;
  path: string;
}

export class PaginationDto {
  page: number = 1;
  limit: number = 10;
  sortBy?: string;
  sortOrder: 'asc' | 'desc' = 'desc';
  search?: string;
}