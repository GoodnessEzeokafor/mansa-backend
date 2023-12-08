import { Module } from '@nestjs/common';
import { DatabaseServicesModule } from '../database/typeorm/database-services.module';
import { UtilsServicesModule } from '../utils/utils.module';
import { ActivityFactoryServices } from './activity-factory.service';
import { ActivityServices } from './activity.service';

@Module({
  imports: [DatabaseServicesModule, UtilsServicesModule],
  providers: [ActivityFactoryServices, ActivityServices],
  exports: [ActivityFactoryServices, ActivityServices],
})
export class ActivityServicesModule {}
