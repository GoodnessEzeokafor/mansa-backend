import {
  OptionalQuery,
  FTSQueryPayload,
  FTSQueryOpts,
  PagingResult,
} from 'src/types/database-types';
import { EntityManager } from 'typeorm';

export abstract class IGenericRepository<T> {
  abstract find(
    fields?: OptionalQuery<T>,
    options?: Record<string, any>,
  ): Promise<T[]>;
  abstract findAllWithPagination(
    query?: any,
    options?: {
      useDefault?: boolean;
      selectFields?: string[] | string;
      relationFields?: string[] | string;
    },
  ): Promise<{
    data: any;
    pagination: {
      hasPrevious: boolean;
      prevPage: number;
      hasNext: boolean;
      next: number;
      currentPage: number;
      pageSize: number;
      lastPage: number;
      total: any;
    };
  }>;
  abstract findOne(
    key: OptionalQuery<T> | OptionalQuery<T>[],
    options?: {
      useDefault?: boolean;
      selectFields?: string[] | string;
      relationFields?: string[] | string;
      relationIds?: boolean;
    },
  ): Promise<T>;
  abstract create(
    payload: T,
    options?: { transaction?: EntityManager; useQueryBuilder?: boolean },
  ): Promise<T>;
  abstract update(
    key: OptionalQuery<T>,
    payload: OptionalQuery<T>,
    options?: { transaction?: EntityManager },
  ): Promise<any>;
  abstract delete(
    key: OptionalQuery<T>,
    options?: { transaction?: EntityManager },
  ): Promise<any>;
  abstract increment(
    filter: OptionalQuery<T>,
    key: string,
    inc: number,
    options?: { transaction?: EntityManager },
  ): Promise<any>;
  abstract decrement(
    filter: OptionalQuery<T>,
    key: string,
    dec: number,
    options?: { transaction?: EntityManager },
  ): Promise<any>;
  abstract customQueryMembersMToMRel(query: any, ids: number): Promise<any>;
  abstract bulkCreate(
    payload: T[],
    options?: {
      transaction?: EntityManager;
    },
  ): Promise<T[]>;
  abstract findMemberInBusiness(email: string, id: number): Promise<any>;
  abstract orFind(payload: {
    fields?: OptionalQuery<T>[];
    pagination?: { perpage: string; page: string; sort: string };
    select?: string | string[];
    relations?: string | string[];
  }): Promise<{
    data: any;
    pagination: {
      hasPrevious: boolean;
      prevPage: number;
      hasNext: boolean;
      next: number;
      currentPage: number;
      pageSize: number;
      lastPage: number;
      total: any;
    };
  }>;
  abstract runQuery(query: string): Promise<any>;
  abstract length(filter: OptionalQuery<T>): Promise<any>;
  abstract findAllByFTS(
    query: FTSQueryPayload,
    queryOpts?: FTSQueryOpts,
  ): Promise<any>;
  abstract searchPostgresql(payload: {
    q: string;
    order: 'DESC' | 'ASC';
    paginationOpts: {
      perpage: string;
      page: string;
    };
  }): Promise<{
    data: any;
    pagination: PagingResult;
  }>;
}
