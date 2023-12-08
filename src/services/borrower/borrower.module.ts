import { Module } from '@nestjs/common';
import { DatabaseServicesModule } from '../database/typeorm/database-services.module';
import { UtilsServicesModule } from '../utils/utils.module';
import { BorrowerServices } from './borrower.service';

@Module({
  imports: [DatabaseServicesModule, UtilsServicesModule],
  providers: [BorrowerServices],
  exports: [BorrowerServices],
})
export class BorrowerServicesModule {}
