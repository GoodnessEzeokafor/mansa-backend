import { Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { IsAdmin } from 'src/decorator';
import { BorrowerServices } from 'src/services/borrower/borrower.service';

@Controller('borrower')
export class AdminBorrowerController {
  constructor(private readonly services: BorrowerServices) {}

  @Post('/seed')
  @IsAdmin(true)
  async seedBorrowers(@Res() res: Response) {
    const response = await this.services.seedBorrowers();
    const status =
      response && response.status ? response.status : HttpStatus.OK;
    return res.status(status).json(response);
  }
}
