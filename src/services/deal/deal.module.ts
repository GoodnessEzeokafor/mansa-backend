import { Module } from '@nestjs/common';
import { DatabaseServicesModule } from '../database/typeorm/database-services.module';
import { UtilsServicesModule } from '../utils/utils.module';
import { DealFactoryServices } from './deal-factory.service';
import { DealServices } from './deal.service';

@Module({
  imports: [DatabaseServicesModule, UtilsServicesModule],
  providers: [DealServices, DealFactoryServices],
  exports: [DealServices, DealFactoryServices],
})
export class DealServicesModule {}
