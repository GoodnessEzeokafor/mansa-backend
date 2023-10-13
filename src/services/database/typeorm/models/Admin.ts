import { AdminEntity } from 'src/entities/Admin.entity';
import { ApiVersions } from 'src/types/api-version-types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Deal } from './Deal';
import { Company } from './Company';
@Entity('admin')
export class Admin implements AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  role: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: '' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: ApiVersions.V1,
  })
  version: string;

  @OneToMany(() => Deal, (deal) => deal.admin)
  deals: Deal[];

  @OneToMany(() => Company, (company) => company.admin)
  companies: Company[];
}
