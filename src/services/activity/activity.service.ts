import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import * as _ from 'lodash';
import { IDatabaseServices } from 'src/abstracts/database-service.abstract';
import { IGetActivities, IGetSingleActivity } from 'src/dto/activity.dto';
import { DataSource } from 'typeorm';
import { UtilsServices } from '../utils/utils.service';
import { ActivityFactoryServices } from './activity-factory.service';

@Injectable()
export class ActivityServices implements OnApplicationShutdown {
  constructor(
    private readonly data: IDatabaseServices,
    private readonly factory: ActivityFactoryServices,
    private readonly utils: UtilsServices,
    private readonly connection: DataSource,
  ) {}
  async onApplicationShutdown(signal: string) {
    console.log('signal', signal);
    this.connection.destroy();
  }

  async getActivities(payload: IGetActivities) {
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

      return this.utils.success200Response({
        message: 'Retrieved successfully',
        data,
        pagination,
      });
    } catch (error) {
      return this.utils.error({
        error,
        action: 'GET ALL ACTIVITIES',
      });
    }
  }

  async getSingleActivity(payload: IGetSingleActivity) {
    try {
      const { id } = payload;
      const data = await this.data.activities.findOne(
        { id },
        { relationIds: true },
      );
      if (!data) {
        return this.utils.error404Response('Activity does not exists');
      }
      return this.utils.success200Response({
        message: 'Retrieved successfully',
        data: {
          ...data,
        },
      });
    } catch (error) {
      return this.utils.error({
        error,
        action: 'GET SINGLE ACTIVITY',
      });
    }
  }
}
