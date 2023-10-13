import { IGenericRepository } from 'src/abstracts/generic-repository.abstract';
import {
  OptionalQuery,
  FTSQueryPayload,
  FTSQueryOpts,
  FTSMode,
  PagingResult,
  AnyPropType,
  PagingQuery,
} from 'src/types/database-types';
import {
  DataSource,
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';

export class TypeOrmGenericRepository<T extends ObjectLiteral>
  implements IGenericRepository<T>
{
  private _selectFields: string[];
  private _relationFields: string[];
  private _fullTextFields: string[];

  private _entity: any;
  private _txEntity: any;

  constructor(
    private connection: DataSource,
    entity: EntityTarget<T>,
    options?: {
      select?: string[];
      relation?: string[];
      fullText?: string[];
    },
  ) {
    this._entity = this.connection.getRepository(entity);
    this._txEntity = entity;
    this._selectFields = options?.select || [];
    this._relationFields = options?.relation || [];
    this._fullTextFields = options?.fullText || [];
  }

  async find(fields?: OptionalQuery<T>): Promise<T[]> {
    try {
      const data = await this._entity.find({
        where: { ...fields },
        select: this._selectFields,
        relations: [],
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async orFind(payload: {
    fields?: OptionalQuery<T>[] | any;
    pagination?: { perpage: string; page: string; sort: string };
    select?: string | string[];
    relations?: string | string[];
  }) {
    try {
      const { pagination, fields, select, relations } = payload;
      const perpage =
        pagination && pagination.perpage ? Number(pagination.perpage) : 10;
      const page = pagination && pagination.page ? Number(pagination.page) : 1;
      const sort = pagination && pagination.sort ? pagination.sort : 'DESC';

      const data = await this._entity.find({
        where: fields,
        order: {
          createdAt: sort,
        },
        take: perpage,
        skip: page * perpage - perpage,
        select,
        relations,
      });
      const total = await this._entity.count({ where: fields });
      const paginated = {
        hasPrevious: page > 1,
        prevPage: page - 1,
        hasNext: page < Math.ceil(total / perpage),
        next: page + 1,
        currentPage: Number(page),
        pageSize: perpage,
        lastPage: Math.ceil(total / perpage),
        total,
      };

      return { data, pagination: paginated };
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAllWithPagination(
    query: any,
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
  }> {
    try {
      const perpage = Number(query.perpage) || 10;
      const page = Number(query.page) || 1;
      const sort = query.sort || 'DESC';

      const excludedFields = [
        'page',
        'perpage',
        'dateFrom',
        'dateTo',
        'sort',
        'search',
        'sortBy',
        'orderBy',
      ];
      excludedFields.forEach((el) => delete query[el]);

      let data: any = {};

      if (options?.useDefault) {
        data = await this._entity.find({
          relations: this._relationFields,
          select: this._selectFields,
          where: { ...query },
          order: {
            createdAt: sort,
          },
          take: perpage,
          skip: page * perpage - perpage,
          loadRelationIds: true,
        });
      } else if (options?.selectFields) {
        data = await this._entity.find({
          select: options?.selectFields,
          where: { ...query },
          order: {
            createdAt: sort,
          },
          take: perpage,
          skip: page * perpage - perpage,
          loadRelationIds: true,
        });
      } else if (options?.relationFields) {
        data = await this._entity.find({
          relations: options?.relationFields,
          where: { ...query },
          order: {
            createdAt: sort,
          },
          take: perpage,
          skip: page * perpage - perpage,
          loadRelationIds: true,
        });
      } else if (options?.selectFields && options?.relationFields) {
        data = await this._entity.find({
          relations: options?.relationFields,
          select: options?.selectFields,
          where: { ...query },
          order: {
            createdAt: sort,
          },
          take: perpage,
          skip: page * perpage - perpage,
          loadRelationIds: true,
        });
      } else {
        data = await this._entity.find({
          where: { ...query },
          order: {
            createdAt: sort,
          },
          take: perpage,
          skip: page * perpage - perpage,
          loadRelationIds: true,
        });
      }
      const total = await this._entity.count({ where: { ...query } });
      const pagination = {
        hasPrevious: page > 1,
        prevPage: page - 1,
        hasNext: page < Math.ceil(total / perpage),
        next: page + 1,
        currentPage: Number(page),
        pageSize: perpage,
        lastPage: Math.ceil(total / perpage),
        total,
      };

      return { data, pagination };
    } catch (e) {
      throw new Error(e);
    }
  }
  async findOne(
    key: OptionalQuery<T> | OptionalQuery<T>[],
    options?: {
      useDefault?: boolean;
      selectFields?: string[] | string;
      relationFields?: string[] | string;
      relationIds?: boolean;
    },
  ): Promise<T> {
    try {
      if (options?.useDefault) {
        const data = await this._entity.findOne({
          where: key,
          relations: this._relationFields,
          select: this._selectFields,
        });
        return Promise.resolve(data);
      }
      if (options?.selectFields && options?.relationFields) {
        const data = await this._entity.findOne({
          where: key,
          relations: options?.relationFields,
          select: options?.selectFields,
        });
        return Promise.resolve(data);
      }
      if (options?.selectFields) {
        const data = await this._entity.findOne({
          where: key,
          select: options?.selectFields,
        });
        return Promise.resolve(data);
      }
      if (options?.relationFields) {
        const data = await this._entity.findOne({
          relations: options?.relationFields,
          where: key,
        });
        return Promise.resolve(data);
      }
      if (options?.relationIds) {
        const data = await this._entity.findOne({
          relations: options?.relationFields,
          where: key,
          loadRelationIds: true,
        });
        return Promise.resolve(data);
      }

      const data = await this._entity.findOne({ where: key });
      return Promise.resolve(data);
    } catch (e) {
      throw new Error(e);
    }
  }
  async create(
    payload: T,
    options?: { useQueryBuilder?: boolean; transaction?: EntityManager },
  ): Promise<T> {
    try {
      if (options?.transaction)
        return await options.transaction
          .getRepository(this._txEntity)
          .save(payload);
      if (!options?.useQueryBuilder) return await this._entity.save(payload);

      const { raw } = await this._entity
        .createQueryBuilder()
        .insert()
        .values(payload)
        .execute();
      if (raw.affectedRows !== 1) throw new Error('Query failed');

      return payload;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async bulkCreate(
    payload: T[],
    options?: {
      transaction?: EntityManager;
    },
  ): Promise<any> {
    try {
      // uses db acidic transaction
      // if (options?.transaction) {
      //   return await options.transaction
      //     .getRepository(this._txEntity)
      //     .upsert(payload, options.conflictPaths as []);
      // }
      if (options?.transaction)
        return await options.transaction
          .getRepository(this._txEntity)
          .save(payload);
      const data = await this._entity
        .createQueryBuilder()
        .insert()
        .into(this._txEntity)
        .values(payload)
        .execute();

      // if (raw.affectedRows !== 1) throw new Error("Query failed")
      // console.log(data)
      // await this._entity.save(payload)
      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async update(
    key: OptionalQuery<T>,
    payload: OptionalQuery<T>,
    options?: { transaction?: EntityManager },
  ): Promise<UpdateResult> {
    try {
      if (options?.transaction) {
        const data = await options.transaction
          .getRepository(this._txEntity)
          .update({ ...key }, { ...payload });
        return data.raw[0];
      }

      const data = await this._entity.update({ ...key }, { ...payload });
      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async delete(
    key: OptionalQuery<T>,
    options?: { transaction: EntityManager },
  ) {
    try {
      if (options?.transaction) {
        const data = await options.transaction
          .getRepository(this._txEntity)
          .delete({ ...key });
        return data;
      }
      const data = await this._entity.delete({ ...key });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async increment(
    filter: OptionalQuery<T>,
    key: string,
    inc: number,
    options?: { transaction: EntityManager },
  ): Promise<UpdateResult> {
    try {
      if (options?.transaction) {
        const data = await options.transaction
          .getRepository(this._txEntity)
          .increment({ ...filter }, key, inc);
        return data;
      }
      const data = await this._entity.increment({ ...filter }, key, inc);
      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async decrement(
    filter: OptionalQuery<T>,
    key: string,
    dec: number,
    options?: { transaction: EntityManager },
  ) {
    try {
      if (options?.transaction) {
        const data = await options.transaction
          .getRepository(this._txEntity)
          .decrement({ ...filter }, key, dec);
        return data;
      }
      const data = await this._entity.decrement({ ...filter }, key, dec, {
        transaction: true,
      });
      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   *
   * @param query
   * @param ids
   * @returns custom query for querying member table m2m relationship
   */
  async customQueryMembersMToMRel(query: any, ids: number) {
    try {
      const perpage = Number(query.perpage) || 10;
      const page = Number(query.page) || 1;
      const sort = query.sort || 'DESC';

      const excludedFields = [
        'page',
        'perpage',
        'dateFrom',
        'dateTo',
        'sort',
        'search',
        'sortBy',
        'orderBy',
      ];
      excludedFields.forEach((el) => delete query[el]);

      const data = await this._entity
        .createQueryBuilder('members')
        .leftJoin('members.businesses', 'businesses')
        .where('businesses.id = :id', { id: ids })
        .addOrderBy('members.createdAt', sort)
        .take(perpage)
        .skip(page * perpage - perpage)
        .getMany();

      const total = await this._entity
        .createQueryBuilder('members')
        .leftJoin('members.businesses', 'businesses')
        .where('businesses.id = :id', { id: ids })
        .addOrderBy('members.createdAt', sort)
        .getMany();

      const length = total.length;

      const pagination = {
        hasPrevious: page > 1,
        prevPage: page - 1,
        hasNext: page < Math.ceil(length / perpage),
        next: page + 1,
        currentPage: Number(page),
        pageSize: perpage,
        lastPage: Math.ceil(length / perpage),
        total: length,
      };

      return { data, pagination };
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   *
   * @param query
   * @param ids
   * @returns custom query for member table m2m relationship
   */
  async findMemberInBusiness(email: string, id: number) {
    try {
      const data = await this._entity
        .createQueryBuilder('businesses')
        .leftJoin('businesses.members', 'members')
        .where('members.email = :email', { email: email })
        .andWhere('businesses.id = :id', { id: id })

        .getOne();

      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   *
   * @param query
   * @returns custom query runner
   */
  async runQuery(query: string) {
    try {
      const data = await this._entity.query(query);

      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async length(filter: OptionalQuery<T>) {
    try {
      const data = await this._entity.count({ where: { ...filter } });
      return Promise.resolve(data);
    } catch (e: any) {
      return Promise.reject(e);
    }
  }

  async findAllByFTS(query: FTSQueryPayload, opts: FTSQueryOpts = {}) {
    try {
      let rawSqlStr: string = '';
      let { q } = query;

      const { perpage, page } = this.getPagingQuery(query);
      let columnStr: string;

      const { mode, useDefault, relationFields } = opts;
      let { fields } = opts;

      const queryBuilder: SelectQueryBuilder<T> =
        await this._entity.createQueryBuilder('$');

      if (fields && Array.isArray(fields)) {
        fields = fields.map((f) => `$.${f}`);
        columnStr = fields.join(',');
      } else {
        fields = this._fullTextFields.map((f) => `$.${f}`);
        console.log('FULL TEXT FIELDS', fields);
        columnStr = fields.join(',');
        console.log('FULL TEXT SEARCH COLUMN STRING', columnStr);
      }

      if (q && q.trim()) {
        switch (mode) {
          case FTSMode.withQueryExpansion:
            rawSqlStr = `MATCH(${columnStr}) AGAINST (:q WITH QUERY EXPANSION)`;
            break;

          case FTSMode.booleanMode:
            rawSqlStr = `MATCH(${columnStr}) AGAINST (:q IN BOOLEAN MODE)`;
            break;

          default:
            rawSqlStr = `MATCH(${columnStr}) AGAINST (:q IN NATURAL LANGUAGE MODE)`;
        }
      }

      if (useDefault) {
        queryBuilder.select(this._selectFields.join(','));
      }
      queryBuilder.where(rawSqlStr, { q });
      console.log('---- yeah --- search rocks -----');
      if (relationFields && Array.isArray(relationFields)) {
        relationFields.forEach((fld) => {
          let relLink = `$.${fld}`;
          queryBuilder.leftJoinAndSelect(relLink, fld);
        });
      } else {
        console.log('---- yeah --- search rocks 2x -----');

        this._relationFields.forEach((fld) => {
          let relLink = `$.${fld}`;
          queryBuilder.leftJoinAndSelect(relLink, fld);
        });
      }
      console.log('---- yeah --- search rocks 3x -----');

      const data = await queryBuilder
        .take(perpage)
        .skip(page * perpage - perpage)
        .getMany();

      const total = await this._entity
        .createQueryBuilder()
        .select()
        .where(rawSqlStr, { q })
        .getMany();

      const pagination: PagingResult = this.getPagingResult({
        total: total.length,
        ...this.getPagingQuery(query),
      });

      return { data, pagination };
    } catch (e) {
      return Promise.reject(e);
    }
  }

  private getPagingQuery(payload: AnyPropType): PagingQuery {
    const perpage = Number(payload.perpage) || 10;
    const page = Number(payload.page) || 1;
    const sort = payload.sort || 'DESC';

    return { perpage, page, sort };
  }

  private getPagingResult(
    payload: { total: number } & PagingQuery,
  ): PagingResult {
    const { total, page, perpage } = payload;
    return {
      hasPrevious: page > 1,
      prevPage: page - 1,
      hasNext: page < Math.ceil(total / perpage),
      next: page + 1,
      currentPage: Number(page),
      pageSize: perpage,
      lastPage: Math.ceil(total / perpage),
      total,
    };
  }

  async searchPostgresql(payload: {
    q: string;
    order: 'DESC' | 'ASC';
    paginationOpts: { perpage: string; page: string; sort: string };
  }) {
    const { q, order, paginationOpts } = payload;
    const { perpage, page } = this.getPagingQuery(paginationOpts);

    const data = await this._entity
      .createQueryBuilder()
      .select()
      .where('document_with_weights @@ plainto_tsquery(:q)', { q })
      .orderBy('ts_rank(document_with_weights, plainto_tsquery(:q))', order)
      .take(perpage)
      .skip(page * perpage - perpage)
      .getMany();

    const total = await this._entity
      .createQueryBuilder()
      .select()
      .where('document_with_weights @@ plainto_tsquery(:q)', { q })
      .getMany();

    const pagination: PagingResult = this.getPagingResult({
      total: total.length,
      ...this.getPagingQuery(paginationOpts),
    });

    return {
      data,
      pagination,
    };
  }
}

// take: perpage,
//   skip:
