import { Module } from '@nestjs/common';
import { DatabaseServicesModule } from '../database/typeorm/database-services.module';
import { UtilsServicesModule } from '../utils/utils.module';
import { CompanyFactoryServices } from './company-factory.service';
import { CompanyServices } from './company.service';

@Module({
  imports: [DatabaseServicesModule, UtilsServicesModule],
  providers: [CompanyServices, CompanyFactoryServices],
  exports: [CompanyServices, CompanyFactoryServices],
})
export class CompanyServicesModule {}
