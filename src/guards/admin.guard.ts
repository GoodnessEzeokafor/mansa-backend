import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IDatabaseServices } from 'src/abstracts/database-service.abstract';
import { UnAuthorizedException, DoesNotExistsException } from 'src/exceptions';
import { UtilsServices } from 'src/services/utils/utils.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly data: IDatabaseServices,
    private readonly reflector: Reflector,
    private readonly utils: UtilsServices,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: any = context.switchToHttp().getRequest();

      const decorator = this.reflector.get<boolean>(
        'is-admin',
        context.getHandler(),
      );
      if (!decorator) return true;

      let token = request.headers.authorization;
      if (!token) throw new UnAuthorizedException('Unauthorized');
      token = token.replace('Bearer ', '');

      const decoded = await this.utils.jwtVerify(token);
      if (!decoded) throw new UnAuthorizedException('Unauthorized');

      const admin = await this.data.admin.findOne({ id: Number(decoded.id) });
      if (!admin || !admin.active)
        throw new DoesNotExistsException('Unauthorized');

      request.admin = admin;
      return true;
    } catch (error) {
      Logger.error(error);
      throw new UnAuthorizedException(error);
    }
  }
}
