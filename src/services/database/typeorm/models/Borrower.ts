import { IsPositive, Min } from 'class-validator';
import { ActivityEntity } from 'src/entities/Activity.entity';
import { BorrowerEntity } from 'src/entities/Borrower.entity';
import { ApiVersions } from 'src/types/api-version-types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('borrowers')
export class Borrower implements BorrowerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  companyName: string;

  @Column({ nullable: true })
  tin: number;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  companyLinkedin: string;

  @Column({ nullable: true })
  companyEntity: string;

  @Column({ nullable: true })
  companyOverview: string;

  @Column({ nullable: true })
  companyYearFounded: string;

  @Column({ nullable: true })
  companySize: string;

  @Column({ nullable: true })
  companyFundingStage: string;

  @Column({ nullable: true })
  companyRegion: string;

  @Column({ nullable: true })
  companyRunway: string;

  @Column({ nullable: true })
  haveAnyDebtFacilities: string;

  @Column({ nullable: true })
  companyOriginatingLoan: string;

  @Column({ nullable: true })
  companyDpd: string;

  @Column({ nullable: true })
  companyUnderlyingAssets: string;

  @Column({ nullable: true })
  companyTotalVolumneOriginatedToDate: string;

  @Column({ nullable: true })
  companyTotalVolumeOriginatedInTheLastTwelveMonths: string;

  @Column({ nullable: true })
  companyAverageLoanSizeInTheLastTwelveMonths: string;

  @Column({ nullable: true })
  companyAverageAnnualEffectiveInterestRateInTheLastTwelveMonths: string;

  @Column({ nullable: true })
  companyAverageLoanTermInTheLastTwelveMonths: string;

  @Column({ nullable: true })
  companyPreferredLoanTerm: string;

  @Column({ nullable: true })
  companyAverageNPLNinetyDaysInTheLastTwelveMonths: string;

  @Column({ nullable: true })
  companyDeckOrWhitepaper: string;

  @Column({ nullable: true })
  companyLinkToBrandAssets: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: ApiVersions.V1,
  })
  version: string;
}
