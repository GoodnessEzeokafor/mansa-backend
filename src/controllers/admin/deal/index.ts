import {
  Controller,
  Post,
  Req,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
  Param,
  Put,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IsAdmin } from 'src/decorator';
import {
  AddDealDto,
  IAddDeal,
  GetDealQueryDto,
  IGetDeals,
  IGetSingleDeal,
  IUpdateDealStats,
  UpdatDealStatsDto,
} from 'src/dto/deal.dto';
import { FindByIdDto } from 'src/dto/param.dto';
import { DealServices } from 'src/services/deal/deal.service';

@Controller('admin/deal')
export class AdminDealController {
  constructor(private readonly services: DealServices) {}

  @Post('/')
  @IsAdmin(true)
  async addDeal(
    @Req() req: Request,
    @Body() body: AddDealDto,
    @Res() res: Response,
  ) {
    const { id: admin } = req.admin;
    const payload: IAddDeal = { ...body, admin };

    const response = await this.services.addDeal(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }

  @Get('/')
  @IsAdmin(true)
  async getDeals(@Query() query: GetDealQueryDto, @Res() res: Response) {
    const payload: IGetDeals = { ...query };

    const response = await this.services.getDeals(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }

  @Get('/:id')
  @IsAdmin(true)
  async getSingleDeal(@Param() params: FindByIdDto, @Res() res: Response) {
    const payload: IGetSingleDeal = { ...params };

    const response = await this.services.getSingleDeal(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }

  @Put('/:id/update-total-value-locked')
  @IsAdmin(true)
  async updateTotalValueLocked(
    @Param() params: FindByIdDto,
    @Body() body: UpdatDealStatsDto,
    @Res() res: Response,
  ) {
    const payload: IUpdateDealStats = { ...params, ...body };

    const response = await this.services.updateTotalValueLocked(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }

  @Put('/:id/update-total-principal-issued')
  @IsAdmin(true)
  async updateTotalPrincipalIssued(
    @Param() params: FindByIdDto,
    @Body() body: UpdatDealStatsDto,
    @Res() res: Response,
  ) {
    const payload: IUpdateDealStats = { ...params, ...body };

    const response = await this.services.updateTotalPrincipalIssued(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }

  @Put('/:id/update-number-of-repaid-deals')
  @IsAdmin(true)
  async updateNumberOfRepaidDeals(
    @Param() params: FindByIdDto,
    @Body() body: UpdatDealStatsDto,
    @Res() res: Response,
  ) {
    const payload: IUpdateDealStats = { ...params, ...body };

    const response = await this.services.updateNumberOfRepaidDeals(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }

  @Put('/:id/update-credit-outstanding')
  @IsAdmin(true)
  async updateCreditOustanding(
    @Param() params: FindByIdDto,
    @Body() body: UpdatDealStatsDto,
    @Res() res: Response,
  ) {
    const payload: IUpdateDealStats = { ...params, ...body };

    const response = await this.services.updateCreditOustanding(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }
}
