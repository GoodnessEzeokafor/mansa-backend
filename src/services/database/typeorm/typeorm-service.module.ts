import { Module } from '@nestjs/common';
// import { IDataServices } from 'src/core/abstracts';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IDatabaseServices } from 'src/abstracts/database-service.abstract';
import { DATABASE_CONFIG } from './config';
import { TypeOrmDatabaseServices } from './typeorm.service';

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG)],
  providers: [
    {
      provide: IDatabaseServices,
      useClass: TypeOrmDatabaseServices,
    },
  ],
  exports: [IDatabaseServices],
})
export class TypeOrmServicesModule {}
