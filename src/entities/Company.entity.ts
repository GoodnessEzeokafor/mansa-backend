import { AdminEntity } from './Admin.entity';

export class CompanyEntity {
  id: number;
  name: string;
  slug: string;
  website: string;
  linkedin: string;
  overview: string;
  addedByAddress: string;
  verified: boolean;
  country: string;
  ethAddress: string;
  admin: AdminEntity | number | { id: number };
}
