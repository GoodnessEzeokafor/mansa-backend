import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import controllers from './controllers';
import services from './services';
import { APP_GUARD } from '@nestjs/core';
import { AdminGuard } from './guards/admin.guard';

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        transactionPin: string;
        emailVerified: boolean;
        comfyUserType: string;
      };
      admin: {
        id: number;
        email: string;
        active: boolean;
      };
    }
  }
}
@Module({
  imports: [...services],
  controllers: [...controllers],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
  ],
})
export class AppModule {}
