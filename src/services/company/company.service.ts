import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { CompanyFactoryServices } from './company-factory.service';
import { IDatabaseServices } from 'src/abstracts/database-service.abstract';
import { UtilsServices } from '../utils/utils.service';
import { DataSource } from 'typeorm';
import {
  IAddCompany,
  IGetCompany,
  IGetSingleCompany,
} from 'src/dto/company.dto';
import * as _ from 'lodash';
@Injectable()
export class CompanyServices implements OnApplicationShutdown {
  constructor(
    private readonly data: IDatabaseServices,
    private readonly factory: CompanyFactoryServices,
    private readonly utils: UtilsServices,
    private readonly connection: DataSource,
    private readonly companyFactory: CompanyFactoryServices,
  ) {}
  async onApplicationShutdown(signal: string) {
    console.log('signal', signal);
    this.connection.destroy();
  }

  async addCompany(payload: IAddCompany) {
    try {
      const { name, adminId } = payload;
      const slug = this.utils.slugifyChar(name.toLowerCase());

      const companyExists = await this.data.company.findOne({ slug });
      if (companyExists) {
        return this.utils.error409Response('Company already exists');
      }
      const admin = await this.data.admin.findOne({ id: adminId });
      const factory = await this.factory.create({
        ...payload,
        addedByAddress: admin.address,
        admin: admin.id,
        slug,
      });
      await this.data.company.create(factory);

      return this.utils.success200Response({
        message: 'Added successfully',
        data: {},
      });
    } catch (error: Error | any | unknown) {
      return this.utils.error({
        error,
        action: 'ADD COMPANY',
      });
    }
  }

  async getCompanies(payload: IGetCompany) {
    try {
      const { perpage, page } = payload;
      const cleaned = this.companyFactory.cleanQuery(payload);
      let response;

      if (payload.q) {
        response = await this.data.company.searchPostgresql({
          q: payload.q,
          order: 'DESC',
          paginationOpts: {
            perpage,
            page,
          },
        });
      } else {
        response = await this.data.company.findAllWithPagination(
          _.omit(cleaned, ['q']),
        );
      }

      const data = response.data;
      const pagination = response.pagination;

      return this.utils.success200Response({
        message: 'Retrieved successfully',
        data,
        pagination,
      });
    } catch (error) {
      return this.utils.error({
        error,
        action: 'GET ALL COMPANIES',
      });
    }
  }

  async getSingleCompany(payload: IGetSingleCompany) {
    try {
      const { slug } = payload;
      const data = await this.data.company.findOne({ slug });

      return this.utils.success200Response({
        message: 'Retrieved successfully',
        data,
      });
    } catch (error) {
      return this.utils.error({
        error,
        action: 'GET SINGLE COMPANY',
      });
    }
  }
}
