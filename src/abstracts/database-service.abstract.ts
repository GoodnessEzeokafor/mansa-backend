import { IGenericRepository } from './generic-repository.abstract';
import { AdminEntity } from 'src/entities/Admin.entity';
import { InvestorEntity } from 'src/entities/Investor.entity';
import { CompanyEntity } from 'src/entities/Company.entity';
import { DealEntity } from 'src/entities/Deal.entity';
import { ActivityEntity } from 'src/entities/Activity.entity';
import { BorrowerEntity } from 'src/entities/Borrower.entity';

export abstract class IDatabaseServices {
  abstract investor: IGenericRepository<InvestorEntity>;
  abstract admin: IGenericRepository<AdminEntity>;
  abstract company: IGenericRepository<CompanyEntity>;
  abstract deal: IGenericRepository<DealEntity>;
  abstract activities: IGenericRepository<ActivityEntity>;
  abstract borrower: IGenericRepository<BorrowerEntity>;
}
