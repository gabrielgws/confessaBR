export type ApiErrorCode =
  | 'VALIDATION_FAILED'
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'VISITOR_LIMITED'
  | 'DUPLICATE_REPORT'
  | 'POLL_ALREADY_VOTED'
  | 'PAYMENT_REQUIRED'
  | 'REVEAL_NOT_ALLOWED'
  | 'RADAR_OPT_IN_REQUIRED'
  | 'UNKNOWN_ERROR';

export type ApiFieldErrors = Record<string, string[]>;

export type ApiError = {
  message: string;
  code: ApiErrorCode;
  status?: number;
  fieldErrors?: ApiFieldErrors;
};

export type ApiSuccess<T> = {
  data: T;
  message?: string;
};

export type PaginationMeta = {
  currentPage: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type CursorPaginationMeta = {
  nextCursor: string | null;
  previousCursor: string | null;
  hasMore: boolean;
};

export type CursorPaginatedResponse<T> = {
  data: T[];
  meta: CursorPaginationMeta;
};

export type ApiActionResult = {
  ok: boolean;
  message?: string;
  reasonCode?: ApiErrorCode;
};
