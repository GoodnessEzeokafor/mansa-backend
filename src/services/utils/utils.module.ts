import { Module } from '@nestjs/common';
import { DatabaseServicesModule } from '../database/typeorm/database-services.module';
import { UtilsServices } from './utils.service';

@Module({
  imports: [DatabaseServicesModule],
  providers: [UtilsServices],
  exports: [UtilsServices],
})
export class UtilsServicesModule {}
