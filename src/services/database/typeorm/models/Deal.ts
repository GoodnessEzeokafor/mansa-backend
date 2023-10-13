import { IsPositive, Min } from 'class-validator';
import { DealEntity } from 'src/entities/Deal.entity';
import { ApiVersions } from 'src/types/api-version-types';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';
import { Admin } from './Admin';
import { Company } from './Company';

@Entity('deal')
export class Deal implements DealEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  status: string;

  @Column({ type: 'text', nullable: true })
  paymentFrquency: string;

  @Column({ type: 'text', nullable: true })
  termStartDate: string;

  @Column({ type: 'text', nullable: true })
  loanEndDate: string;

  @ManyToOne(() => Admin, (admin) => admin.deals)
  admin: Admin;

  @ManyToOne(() => Company, (company) => company.deals)
  company: Company;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    unsigned: true,
  })
  @IsPositive()
  @Min(0)
  totalValueLocked: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    unsigned: true,
  })
  @IsPositive()
  @Min(0)
  totalPrincipalIssued: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    unsigned: true,
  })
  @IsPositive()
  @Min(0)
  creditOustanding: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    unsigned: true,
  })
  @IsPositive()
  @Min(0)
  numberOfRepaidDeals: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: ApiVersions.V1,
  })
  version: string;
}
