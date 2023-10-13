import { Controller, Get, Query, Res, HttpStatus, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsAdmin } from 'src/decorator';
import { GetDealQueryDto, IGetDeals, IGetSingleDeal } from 'src/dto/deal.dto';
import { FindByIdDto } from 'src/dto/param.dto';
import { DealServices } from 'src/services/deal/deal.service';

@Controller('deal')
export class DealController {
  constructor(private readonly services: DealServices) {}

  @Get('/')
  async getDeals(@Query() query: GetDealQueryDto, @Res() res: Response) {
    const payload: IGetDeals = { ...query };

    const response = await this.services.getDeals(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }

  @Get('/:id')
  async getSingleDeal(@Param() params: FindByIdDto, @Res() res: Response) {
    const payload: IGetSingleDeal = { ...params };

    const response = await this.services.getSingleDeal(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }
}
