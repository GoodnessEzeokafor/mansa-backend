import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Req,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IsAdmin } from 'src/decorator';
import {
  AddCompanyDto,
  GetCompanyQueryDto,
  IAddCompany,
  IGetCompany,
  IGetSingleCompany,
} from 'src/dto/company.dto';
import { FindBySlugDto } from 'src/dto/param.dto';
import { CompanyServices } from 'src/services/company/company.service';

@Controller('admin/company')
export class AdminCompanyController {
  constructor(private readonly services: CompanyServices) {}

  @Post('/')
  @IsAdmin(true)
  async addCompany(
    @Req() req: Request,
    @Body() body: AddCompanyDto,
    @Res() res: Response,
  ) {
    const { id: adminId } = req.admin;
    const payload: IAddCompany = { ...body, adminId };

    const response = await this.services.addCompany(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }

  @Get('/')
  @IsAdmin(true)
  async getCompanies(@Query() query: GetCompanyQueryDto, @Res() res: Response) {
    const payload: IGetCompany = { ...query };

    const response = await this.services.getCompanies(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }

  @Get('/:slug')
  @IsAdmin(true)
  async getSingleCompany(@Param() params: FindBySlugDto, @Res() res: Response) {
    const payload: IGetSingleCompany = { ...params };

    const response = await this.services.getSingleCompany(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }
}
