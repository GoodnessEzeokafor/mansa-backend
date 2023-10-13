import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IsAdmin } from 'src/decorator';
import {
  AddAdminDto,
  AdminLoginDto,
  IAdminLogin,
  IGetAuthAdminUser,
  ISetAdmin,
} from 'src/dto/admin.dto';
import { AdminAuthenticationServices } from 'src/services/admin-auth/admin-auth.service';

@Controller('admin/auth')
export class AdminAuthenticationController {
  constructor(private readonly services: AdminAuthenticationServices) {}

  @Post('/set-admin')
  //   @IsAdmin(true)
  async setAdmin(
    // @Req() req: Request,
    @Body() body: AddAdminDto,
    @Res() res: Response,
  ) {
    // const { id: adminId } = req.admin;
    const payload: ISetAdmin = { ...body };

    const response = await this.services.setAdmin(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }

  @Post('/login')
  async login(@Body() body: AdminLoginDto, @Res() res: Response) {
    const payload: IAdminLogin = { ...body };
    const response = await this.services.login(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }

  @Get('/user')
  @IsAdmin(true)
  async authUser(@Req() req: Request, @Res() res: Response) {
    const { id: adminId } = req.admin;
    const payload: IGetAuthAdminUser = { adminId };

    const response = await this.services.authUser(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }
}
