import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDatabaseServices } from 'src/abstracts/database-service.abstract';
import { DataSource } from 'typeorm';
import { Investor } from './models/Investor';
import { Admin } from './models/Admin';
import { Company } from './models/Company';
import { Deal } from './models/Deal';
import { TypeOrmGenericRepository } from './typeorm-generic-repository.service';
import { Activity } from './models/Activity';
import { Borrower } from './models/Borrower';

@Injectable()
export class TypeOrmDatabaseServices
  implements IDatabaseServices, OnApplicationBootstrap
{
  investor: TypeOrmGenericRepository<Investor>;
  admin: TypeOrmGenericRepository<Admin>;
  company: TypeOrmGenericRepository<Company>;
  deal: TypeOrmGenericRepository<Deal>;
  activities: TypeOrmGenericRepository<Activity>;
  borrower: TypeOrmGenericRepository<Borrower>;

  constructor(private connection: DataSource) {}

  onApplicationBootstrap() {
    this.investor = new TypeOrmGenericRepository<Investor>(
      this.connection,
      Investor,
    );
    this.admin = new TypeOrmGenericRepository<Admin>(this.connection, Admin);
    this.company = new TypeOrmGenericRepository<Company>(
      this.connection,
      Company,
    );
    this.deal = new TypeOrmGenericRepository<Deal>(this.connection, Deal);
    this.activities = new TypeOrmGenericRepository<Activity>(
      this.connection,
      Activity,
    );
    this.borrower = new TypeOrmGenericRepository<Borrower>(
      this.connection,
      Borrower,
    );
  }
}
