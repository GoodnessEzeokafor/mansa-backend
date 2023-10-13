import { InvestorEntity } from 'src/entities/Investor.entity';
import { ApiVersions } from 'src/types/api-version-types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('investor')
export class Investor implements InvestorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: ApiVersions.V1,
  })
  version: string;
}
