export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  DENIED = 'denied',
  SUCCESS = 'success',
  FAILED = 'failed',
  ACTIVE = 'active',
  IN_ACTIVE = 'in-active',
  ACCEPTED = 'accepted',
  EXPIRED = 'expired',
  OPEN = 'open',
}

export type DateType = {
  to: string;
  from: string;
};

export interface AnyPropType {
  [key: string]: any;
}

export enum FTSMode {
  naturalLanguageModel = 'nlm',
  booleanMode = 'bm',
  withQueryExpansion = 'wqe',
}
export type PaginationType = {
  perpage: string;
  page: string;
  sort: string;
  q: string;
};

export type FTSQueryPayload = PaginationType & {
  q: string;
  exclusions?: string;
};
export type PagingResult = {
  hasPrevious: boolean;
  prevPage: number;
  hasNext: boolean;
  next: number;
  currentPage: number;
  pageSize: number;
  lastPage: number;
  total: number;
};

export type FTSQueryOpts = {
  mode?: string | FTSMode;
  fields?: string[];
  useDefault?: boolean;
  relationFields?: string[];
};

export type OptionalQuery<T> = {
  [K in keyof T]?: T[K];
};

export type PagingQuery = {
  perpage: number;
  page: number;
  sort?: 'ASC' | 'DESC';
};
