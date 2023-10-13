import { AdminEntity } from './Admin.entity';
import { CompanyEntity } from './Company.entity';

export class DealEntity {
  admin: AdminEntity | { id: number } | number;
  id: number;

  totalValueLocked: number;
  totalPrincipalIssued: number;
  creditOustanding: number;
  numberOfRepaidDeals: number;

  status: string;
  company: CompanyEntity | number | { id: number };
  paymentFrquency: string;
  termStartDate: string;
  loanEndDate: string;
  active: boolean;
}
