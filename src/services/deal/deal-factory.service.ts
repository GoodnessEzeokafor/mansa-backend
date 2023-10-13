import { Injectable } from '@nestjs/common';
import { IGetDeals } from 'src/dto/deal.dto';
import { DealEntity } from 'src/entities/Deal.entity';
import { queryDbByDateFilter } from '../database/typeorm/database-helper';
import { UtilsServices } from '../utils/utils.service';
import { Status } from 'src/types/database-types';

@Injectable()
export class DealFactoryServices {
  constructor(private readonly utils: UtilsServices) {}
  async create(data: Partial<DealEntity>) {
    const deal = new DealEntity();
    if (data.totalValueLocked)
      deal.totalValueLocked = this.utils.convertToNthDP(
        data.totalValueLocked,
        2,
      );
    if (data.totalPrincipalIssued)
      deal.totalPrincipalIssued = this.utils.convertToNthDP(
        data.totalPrincipalIssued,
        2,
      );
    if (data.creditOustanding)
      deal.creditOustanding = this.utils.convertToNthDP(
        data.creditOustanding,
        2,
      );
    if (data.numberOfRepaidDeals)
      deal.numberOfRepaidDeals = this.utils.convertToNthDP(
        data.numberOfRepaidDeals,
        2,
      );
    if (data.paymentFrquency) deal.paymentFrquency = data.paymentFrquency;
    if (data.termStartDate) deal.termStartDate = data.termStartDate;
    if (data.loanEndDate) deal.loanEndDate = data.loanEndDate;
    if (data.company) deal.company = data.company;
    if (data.admin) deal.admin = data.admin;
    deal.status = Status.OPEN;
    return deal;
  }

  cleanQuery(data: IGetDeals) {
    let key: Partial<IGetDeals> = {};
    if (data.id) key['id'] = data.id;
    if (data.status) key['status'] = data.status;

    if (data.company)
      key['company'] = {
        id: Number(data.company),
      };

    if (data.perpage) key['perpage'] = data.perpage;
    if (data.page) key['page'] = data.page;
    if (data.sort) key['sort'] = data.sort;
    if (data.q) key['q'] = data.q;
    if (data.to || data.from) {
      const dateQuery = queryDbByDateFilter(data);
      key = { ...key, ...dateQuery };
    }
    return key;
  }
}
