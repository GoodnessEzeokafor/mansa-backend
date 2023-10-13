import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class ExtraQueryDto {
  @IsOptional()
  @IsString()
  perpage: string;

  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @IsString()
  q: string;

  @IsOptional()
  @IsString()
  to: string;

  @IsOptional()
  @IsString()
  from: string;
}

export class FindByIdDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsPositive()
  id: number;
}

export class FindBySlugDto {
  @IsNotEmpty()
  @IsString()
  slug: string;
}
