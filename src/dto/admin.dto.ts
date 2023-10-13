import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddAdminDto {
  @IsNotEmpty()
  @IsString()
  public readonly address: string;

  @IsOptional()
  @IsEmail()
  public readonly email: string;

  @IsOptional()
  @IsString()
  public readonly firstName: string;

  @IsOptional()
  @IsString()
  public readonly lastName: string;

  @IsOptional()
  @IsString()
  public readonly role: string;
}
export class AdminLoginDto {
  //   @IsNotEmpty()
  //   @IsEmail()
  //   public readonly email: string;

  @IsNotEmpty()
  @IsString()
  public readonly address: string;
}

export type ISetAdmin = AddAdminDto & {};
export type IGetAuthAdminUser = { adminId: number };
export type IAdminLogin = AdminLoginDto & {};
