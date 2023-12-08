import { Injectable } from '@nestjs/common';
import { ActivityEntity } from 'src/entities/Activity.entity';
import { UtilsServices } from '../utils/utils.service';
import { IGetActivities } from 'src/dto/activity.dto';
import { queryDbByDateFilter } from '../database/typeorm/database-helper';

@Injectable()
export class ActivityFactoryServices {
  constructor(private readonly utils: UtilsServices) {}
  async create(data: Partial<ActivityEntity>) {
    const activity = new ActivityEntity();

    if (data.type) activity.type = data.type;
    if (data.trench) activity.trench = data.trench;

    return activity;
  }

  cleanQuery(data: IGetActivities) {
    let key: Partial<IGetActivities> = {};
    if (data.id) key['id'] = data.id;
    if (data.type) key['type'] = data.type;
    if (data.trench) key['trench'] = data.trench;

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
