import { Controller, Get, Query, Res, HttpStatus, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsAdmin } from 'src/decorator';
import { GetActivityQueryDto, IGetActivities } from 'src/dto/activity.dto';
import { GetDealQueryDto, IGetDeals, IGetSingleDeal } from 'src/dto/deal.dto';
import { FindByIdDto } from 'src/dto/param.dto';
import { ActivityServices } from 'src/services/activity/activity.service';
import { DealServices } from 'src/services/deal/deal.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly services: ActivityServices) {}

  @Get('/')
  async getActivities(
    @Query() query: GetActivityQueryDto,
    @Res() res: Response,
  ) {
    const payload: IGetActivities = { ...query };

    const response = await this.services.getActivities(payload);
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }
}
