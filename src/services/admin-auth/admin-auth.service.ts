import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { hash } from 'bcrypt';
import { IDatabaseServices } from 'src/abstracts/database-service.abstract';
import { DataSource } from 'typeorm';
import { IJwtUser, UtilsServices } from '../utils/utils.service';
import { AdminFactoryServices } from './admin-auth-factory.service';
import { IAdminLogin, IGetAuthAdminUser, ISetAdmin } from 'src/dto/admin.dto';
import * as _ from 'lodash';

@Injectable()
export class AdminAuthenticationServices implements OnApplicationShutdown {
  constructor(
    private readonly data: IDatabaseServices,
    private readonly adminFactory: AdminFactoryServices,
    private readonly utils: UtilsServices,
    private readonly connection: DataSource,
  ) {}
  async onApplicationShutdown(signal: string) {
    console.log('signal', signal);
    this.connection.destroy();
  }

  async setAdmin(payload: ISetAdmin) {
    const { email } = payload;

    try {
      const adminExists = await this.data.admin.findOne({ email });
      if (adminExists) {
        return this.utils.error409Response('Admin already exists');
      }
      const factory = await this.adminFactory.create({
        ...payload,
      });
      await this.data.admin.create(factory);

      return this.utils.success200Response({
        message: 'Added successfully',
        data: {},
      });
    } catch (error: Error | any | unknown) {
      return this.utils.error({
        error,
        action: 'SET ADMIN',
      });
    }
  }

  async login(payload: IAdminLogin) {
    const { address } = payload;
    try {
      const admin = await this.data.admin.findOne({ address });
      if (this.utils.isEmpty(admin)) {
        return this.utils.error400Response('Email or password incorrect');
      }

      if (!admin.active) {
        return this.utils.error403Response('Account is disabled');
      }

      const data: IJwtUser = {
        id: admin?.id,
        email: admin?.email,
      };
      const token = await this.utils.jwtSign(data);
      return this.utils.success200Response({
        message: 'Logged in successfully',
        token: `Bearer ${token}`,
        data,
      });
    } catch (error) {
      return this.utils.error({
        error,
        action: 'ADMIN LOGIN',
      });
    }
  }

  async authUser(payload: IGetAuthAdminUser) {
    const { adminId } = payload;

    try {
      const data = await this.data.admin.findOne({ id: adminId });
      return this.utils.success200Response({
        message: 'Retrieved successfully',
        data: _.omit(data, ['password']),
      });
    } catch (error: Error | any | unknown) {
      return this.utils.error({
        error,
        action: 'AUTH ADMIN USER',
      });
    }
  }
}
