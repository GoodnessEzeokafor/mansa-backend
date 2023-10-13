import { CompanyEntity } from 'src/entities/Company.entity';
import { ApiVersions } from 'src/types/api-version-types';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Entity,
  ManyToOne,
} from 'typeorm';
import { Deal } from './Deal';
import { Admin } from './Admin';

@Entity('company')
export class Company implements CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  linkedin: string;

  @Column({ type: 'text', nullable: true })
  overview: string;

  @Column({ type: 'text', nullable: true })
  addedByAddress: string;

  @Column({ type: 'text', nullable: true })
  country: string;

  @Column({ type: 'text', nullable: true })
  ethAddress: string;

  @Column({ default: true })
  verified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: ApiVersions.V1,
  })
  version: string;

  @OneToMany(() => Deal, (deal) => deal.company)
  deals: Deal[];

  @ManyToOne(() => Admin, (admin) => admin.companies)
  admin: Admin;
}
