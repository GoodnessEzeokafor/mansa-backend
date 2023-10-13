import { Module } from '@nestjs/common';
import { DatabaseServicesModule } from '../database/typeorm/database-services.module';
import { UtilsServicesModule } from '../utils/utils.module';
import { AdminAuthenticationServices } from './admin-auth.service';
import { AdminFactoryServices } from './admin-auth-factory.service';

@Module({
  imports: [DatabaseServicesModule, UtilsServicesModule],
  providers: [AdminFactoryServices, AdminAuthenticationServices],
  exports: [AdminFactoryServices, AdminAuthenticationServices],
})
export class AdminAuthServicesModule {}
