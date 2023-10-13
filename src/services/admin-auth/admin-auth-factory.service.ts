import { Injectable } from '@nestjs/common';
import { AdminEntity } from 'src/entities/Admin.entity';
import { UtilsServices } from '../utils/utils.service';

@Injectable()
export class AdminFactoryServices {
  constructor(private readonly utils: UtilsServices) {}
  async create(data: Partial<AdminEntity>) {
    const admin = new AdminEntity();
    if (data.email) admin.email = data.email.trim();
    if (data.firstName) admin.firstName = data.firstName.trim();
    if (data.lastName) admin.lastName = data.lastName.trim();
    if (data.address) admin.address = data.address.trim();
    if (data.password) admin.password = await this.utils.hash(data.password);
    if (data.role) admin.role = data.role;

    return admin;
  }
}
