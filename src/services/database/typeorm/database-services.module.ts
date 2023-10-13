import { Module } from '@nestjs/common';
import { TypeOrmServicesModule } from './typeorm-service.module';

@Module({
  imports: [TypeOrmServicesModule],
  exports: [TypeOrmServicesModule],
})
export class DatabaseServicesModule {}
