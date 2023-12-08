import { IsPositive, Min } from 'class-validator';
import { ActivityEntity } from 'src/entities/Activity.entity';
import { ApiVersions } from 'src/types/api-version-types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('activities')
export class Activity implements ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: false })
  trench: string;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    unsigned: true,
  })
  @IsPositive()
  @Min(0)
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: ApiVersions.V1,
  })
  version: string;
}
