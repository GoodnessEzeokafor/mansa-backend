import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  isNotEmpty,
} from 'class-validator';
import { ExtraQueryDto } from './param.dto';
import { Type } from 'class-transformer';

export enum DealsPaymentFrequencyEnum {
  MONTHLY = 'monthly',
}
export class AddDealDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  public readonly totalValueLocked: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  public readonly totalPrincipalIssued: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  public readonly creditOustanding: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  public readonly numberOfRepaidDeals: number;

  @IsNotEmpty()
  @IsEnum(DealsPaymentFrequencyEnum)
  public readonly paymentFrquency: string;

  @IsNotEmpty()
  @IsString()
  public readonly termStartDate: string;

  @IsNotEmpty()
  @IsString()
  public readonly loanEndDate: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  public readonly company: number;
}
export class GetDealQueryDto extends ExtraQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  company: number | { id: number };

  @IsOptional()
  @IsString()
  status: string;
}
export class UpdatDealStatsDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  amount: number;
}
export type IAddDeal = AddDealDto & {
  company: number;
  admin: number;
};

export type IGetDeals = GetDealQueryDto & {};
export type IGetSingleDeal = {
  id: number;
};
export type IUpdateDealStats = UpdatDealStatsDto & IGetSingleDeal & {};
