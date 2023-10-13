import { Injectable } from '@nestjs/common';
import { IGetCompany } from 'src/dto/company.dto';
import { CompanyEntity } from 'src/entities/Company.entity';
import { queryDbByDateFilter } from '../database/typeorm/database-helper';

@Injectable()
export class CompanyFactoryServices {
  constructor() {}
  async create(data: Partial<CompanyEntity>) {
    const company = new CompanyEntity();
    if (data.name) company.name = data.name.trim();
    if (data.website) company.website = data.website.trim();
    if (data.linkedin) company.linkedin = data.linkedin.trim();
    if (data.overview) company.overview = data.overview.trim();
    if (data.addedByAddress) company.addedByAddress = data.addedByAddress;
    if (data.verified) company.verified = data.verified;
    if (data.country) company.country = data.country;
    if (data.ethAddress) company.ethAddress = data.ethAddress;
    if (data.slug) company.slug = data.slug;

    return company;
  }

  cleanQuery(data: IGetCompany) {
    let key: Partial<IGetCompany> = {};
    if (data.id) key['id'] = data.id;

    if (data.ethAddress) key['ethAddress'] = data.ethAddress;
    if (data.country) key['country'] = data.country;
    if (data.slug) key['slug'] = data.slug;
    if (data.name) key['name'] = data.name;
    if (data.verified) key['verified'] = data.verified;
    if (data.website) key['website'] = data.website;
    if (data.addedByAddress) key['addedByAddress'] = data.addedByAddress;

    if (data.admin)
      key['admin'] = {
        id: Number(data.admin),
      };

    if (data.perpage) key['perpage'] = data.perpage;
    if (data.page) key['page'] = data.page;
    if (data.sort) key['sort'] = data.sort;
    // if (data.to || data.from) {
    //     const dateQuery = queryDbByDateFilter(data);
    //     key = { ...key, ...dateQuery }
    // }
    if (data.q) key['q'] = data.q;
    if (data.to || data.from) {
      const dateQuery = queryDbByDateFilter(data);
      key = { ...key, ...dateQuery };
    }
    return key;
  }
}
