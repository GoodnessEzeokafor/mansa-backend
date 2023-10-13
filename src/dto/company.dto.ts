import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ExtraQueryDto } from './param.dto';
import { Type } from 'class-transformer';

export class AddCompanyDto {
  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsString()
  public readonly website: string;

  @IsNotEmpty()
  @IsString()
  public readonly linkedin: string;

  @IsNotEmpty()
  @IsString()
  public readonly overview: string;

  @IsNotEmpty()
  @IsString()
  public readonly country: string;

  @IsNotEmpty()
  @IsString()
  public readonly ethAddress: string;
}
export type IAddCompany = AddCompanyDto & {
  adminId: number;
};

export class GetCompanyQueryDto extends ExtraQueryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsOptional()
  @IsString()
  addedByAddress: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  verified: boolean;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  ethAddress: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(1)
  admin: number | { id: number };

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(1)
  id: number;
}

export type IGetCompany = GetCompanyQueryDto & {};
export type IGetSingleCompany = { slug: string };
