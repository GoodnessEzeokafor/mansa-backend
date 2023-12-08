import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';
import { ExtraQueryDto } from './param.dto';

export class GetActivityQueryDto extends ExtraQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  trench: string;
}

export type IGetActivities = GetActivityQueryDto;
export type IGetSingleActivity = {
  id: number;
};
