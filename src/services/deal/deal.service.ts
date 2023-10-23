import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { IDatabaseServices } from 'src/abstracts/database-service.abstract';
import { UtilsServices } from '../utils/utils.service';
import { DataSource } from 'typeorm';
import * as _ from 'lodash';
import { DealFactoryServices } from './deal-factory.service';
import {
  IAddDeal,
  IGetDeals,
  IGetSingleDeal,
  IUpdateDealStats,
} from 'src/dto/deal.dto';

@Injectable()
export class DealServices implements OnApplicationShutdown {
  constructor(
    private readonly data: IDatabaseServices,
    private readonly factory: DealFactoryServices,
    private readonly utils: UtilsServices,
    private readonly connection: DataSource,
  ) {}
  async onApplicationShutdown(signal: string) {
    console.log('signal', signal);
    this.connection.destroy();
  }

  async addDeal(payload: IAddDeal) {
    try {
      const { admin, company } = payload;

      const companyData = await this.data.company.findOne({ id: company });
      if (!companyData) {
        return this.utils.error404Response('Company does not exists.');
      }
      const dealExists = await this.data.deal.findOne({
        company: { id: company },
      });
      if (dealExists) {
        return this.utils.error409Response('Company already exists');
      }

      const factory = await this.factory.create({
        ...payload,
        admin,
      });
      await this.data.deal.create(factory);

      return this.utils.success200Response({
        message: 'Added successfully',
        data: {},
      });
    } catch (error: Error | any | unknown) {
      return this.utils.error({
        error,
        action: 'ADD DEAL',
      });
    }
  }

  async getDeals(payload: IGetDeals) {
    try {
      const { perpage, page } = payload;
      const cleaned = this.factory.cleanQuery(payload);
      let response;

      if (payload.q) {
        response = await this.data.deal.searchPostgresql({
          q: payload.q,
          order: 'DESC',
          paginationOpts: {
            perpage,
            page,
          },
        });
      } else {
        response = await this.data.deal.findAllWithPagination(
          _.omit(cleaned, ['q']),
          // { relationFields: ['company'] },
        );
      }

      const data = response.data;
      const pagination = response.pagination;
      for (let i = 0; i < data.length; i++) {
        const company = await this.data.company.findOne({
          id: data[i].company,
        });
        data[i].company = company;
      }
      return this.utils.success200Response({
        message: 'Retrieved successfully',
        data,
        pagination,
      });
    } catch (error) {
      return this.utils.error({
        error,
        action: 'GET ALL DEALS',
      });
    }
  }

  async getSingleDeal(payload: IGetSingleDeal) {
    try {
      const { id } = payload;
      const data = await this.data.deal.findOne({ id }, { relationIds: true });
      if (!data) {
        return this.utils.error404Response('Deal does not exists');
      }
      const company = await this.data.company.findOne({
        id: Number(data.company),
      });
      return this.utils.success200Response({
        message: 'Retrieved successfully',
        data: {
          ...data,
          company,
        },
      });
    } catch (error) {
      return this.utils.error({
        error,
        action: 'GET SINGLE DAL',
      });
    }
  }

  async updateTotalValueLocked(payload: IUpdateDealStats) {
    try {
      const { id, amount } = payload;
      const data = await this.data.deal.findOne({ id });
      if (!data) {
        return this.utils.error404Response('Deal does not exists');
      }
      await this.data.deal.increment(
        { id: data.id },
        'totalValueLocked',
        Number(amount),
      );
      return this.utils.success200Response({
        message: 'Retrieved successfully',
        data,
      });
    } catch (error) {
      return this.utils.error({
        error,
        action: 'UPDATE TOTAL VALUE LOCKED',
      });
    }
  }

  async updateTotalPrincipalIssued(payload: IUpdateDealStats) {
    try {
      const { id, amount } = payload;
      const data = await this.data.deal.findOne({ id });
      if (!data) {
        return this.utils.error404Response('Deal does not exists');
      }
      await this.data.deal.increment(
        { id: data.id },
        'totalPrincipalIssued',
        Number(amount),
      );
      return this.utils.success200Response({
        message: 'Retrieved successfully',
        data,
      });
    } catch (error) {
      return this.utils.error({
        error,
        action: 'UPDATE TOTAL PRINCIPAL ISSUED',
      });
    }
  }

  async updateNumberOfRepaidDeals(payload: IUpdateDealStats) {
    try {
      const { id, amount } = payload;
      const data = await this.data.deal.findOne({ id });
      if (!data) {
        return this.utils.error404Response('Deal does not exists');
      }
      await this.data.deal.increment(
        { id: data.id },
        'numberOfRepaidDeals',
        Number(amount),
      );
      return this.utils.success200Response({
        message: 'Retrieved successfully',
        data,
      });
    } catch (error) {
      return this.utils.error({
        error,
        action: 'UPDATE NUMBER OF REPAID DEALS',
      });
    }
  }

  async updateCreditOustanding(payload: IUpdateDealStats) {
    try {
      const { id, amount } = payload;
      const data = await this.data.deal.findOne({ id });
      if (!data) {
        return this.utils.error404Response('Deal does not exists');
      }
      await this.data.deal.increment(
        { id: data.id },
        'creditOustanding',
        Number(amount),
      );
      return this.utils.success200Response({
        message: 'Retrieved successfully',
        data,
      });
    } catch (error) {
      return this.utils.error({
        error,
        action: 'UPDATE CREDIT OUTSTANDING',
      });
    }
  }
}
