import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import * as _ from 'lodash';
import { DataSource } from 'typeorm';
import { UtilsServices } from '../utils/utils.service';

@Injectable()
export class BorrowerServices implements OnApplicationShutdown {
  constructor(
    private readonly connection: DataSource,
    private readonly utils: UtilsServices,
  ) {}
  async onApplicationShutdown(signal: string) {
    console.log('signal', signal);
    this.connection.destroy();
  }

  async seedBorrowers() {
    try {
      // open csv file
      // first need to see how its saved on the csv
      // upload to the db
      return this.utils.success200Response({
        message: 'Added successfully',
        data: {},
      });
    } catch (error: Error | any | unknown) {
      return this.utils.error({
        error,
        action: 'SEED BORROWER',
      });
    }
  }
}
