import { ActivityServicesModule } from './activity/activity.module';
import { AdminAuthServicesModule } from './admin-auth/admin-auth.module';
import { BorrowerServicesModule } from './borrower/borrower.module';
import { CompanyServicesModule } from './company/company.module';
import { DatabaseServicesModule } from './database/typeorm/database-services.module';
import { DealServicesModule } from './deal/deal.module';
import { UtilsServicesModule } from './utils/utils.module';

export default [
  DatabaseServicesModule,
  UtilsServicesModule,
  AdminAuthServicesModule,
  CompanyServicesModule,
  DealServicesModule,
  ActivityServicesModule,
  BorrowerServicesModule,
];
