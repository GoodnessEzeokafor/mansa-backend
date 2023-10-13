import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { MessageBuilder, Webhook } from 'discord-webhook-node';
import {
  ISuccessResponse,
  ResponseState,
  IErrorResponse,
} from 'src/types/response-types';
import { IDiscord } from 'src/types/utils-types';
import * as bcrypt from 'bcrypt';
import { verify, sign } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from 'src/config/env';
import slugify from 'slugify';

const ERROR_MESSAGE: string = 'An error occured, please contact support';
export const JWT_EXPIRY_TIME_IN_HR = 5;
export type IJwtUser = {
  id: number;
  email?: string;
  bvnVerified?: boolean;
};

@Injectable()
export class UtilsServices {
  constructor() {} // private discord: DiscordServices

  errorMessage(error: any) {
    if (error.message) return error.message;
    if (error.responseMessage) return error.responseMessage;
    return ERROR_MESSAGE;
  }
  public async error(payload: { error: any; action: string; email?: string }) {
    const { error, action } = payload;
    console.log('------ error  ------');
    console.error(error);

    console.log('------ error  ------');

    const message = this.errorMessage(error);
    console.log('------ error message ------');
    console.log(message);
    console.log('------ error message ------');

    const details = {
      technicalMessage: error.message,
      message,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      //   state: ResponseState.ERROR,
    };

    console.log(details);

    // this.eventEmitter.emit('process.send.to.discord', {
    //   link: env.isProd
    //     ? ERROR_DISCORD_CHANNEL_PRODUCTION
    //     : ERROR_DISCORD_CHANNEL_DEVELOPMENT,
    //   title: `error.${env.env}`,
    //   message: `

    //               ACTION:- ${action}

    //               ERROR STATUS:- ${HttpStatus.INTERNAL_SERVER_ERROR}

    //               ERROR MESSAGE:- ${message}

    //               ERROR:- ${
    //                 typeof error === 'string' ? error : JSON.stringify(error)
    //               }

    //               `,
    // });
    return details;
  }

  async sendToDiscord(payload: IDiscord) {
    // send to discord
    const { link, title, author, message } = payload;
    try {
      const hook = new Webhook(link);
      const embed = await new MessageBuilder()
        .setTitle(title)
        .setAuthor(author || 'Comfy')
        .setDescription(message);
      hook.send(embed);
      Logger.log('Discord notification sent');
    } catch (e) {
      Logger.error('@discord', e);
      throw new Error(e);
    }
  }

  public successResponse(payload: ISuccessResponse): ISuccessResponse {
    return { ...payload, state: ResponseState.SUCCESS };
  }
  public success201Response(payload: ISuccessResponse): ISuccessResponse {
    return {
      ...payload,
      state: ResponseState.SUCCESS,
      status: HttpStatus.CREATED,
    };
  }
  public success200Response(payload: ISuccessResponse): ISuccessResponse {
    return {
      ...payload,
      state: ResponseState.SUCCESS,
      status: HttpStatus.OK,
    };
  }

  public success202Response(payload: ISuccessResponse): ISuccessResponse {
    return {
      ...payload,
      state: ResponseState.SUCCESS,
      status: HttpStatus.ACCEPTED,
    };
  }

  public success204Response(payload: ISuccessResponse): ISuccessResponse {
    return {
      ...payload,
      state: ResponseState.SUCCESS,
      status: HttpStatus.NO_CONTENT,
    };
  }
  public errorResponse(payload: IErrorResponse): IErrorResponse {
    return {
      ...payload,
      state: ResponseState.ERROR,
      error: null,
    };
  }

  public error400Response(message: string): IErrorResponse {
    return {
      message,
      state: ResponseState.ERROR,
      error: null,
      status: HttpStatus.BAD_REQUEST,
    };
  }

  public error404Response(message: string): IErrorResponse {
    return {
      message,
      state: ResponseState.ERROR,
      error: null,
      status: HttpStatus.NOT_FOUND,
    };
  }

  public error409Response(message: string): IErrorResponse {
    return {
      message,
      state: ResponseState.ERROR,
      error: null,
      status: HttpStatus.CONFLICT,
    };
  }

  public error403Response(message: string): IErrorResponse {
    return {
      message,
      state: ResponseState.ERROR,
      error: null,
      status: HttpStatus.FORBIDDEN,
    };
  }

  public async hash(password: string) {
    const saltRound = 10;

    const hash = await bcrypt.hash(password, saltRound);
    return hash;
  }

  public async jwtSign(
    payload: IJwtUser & { exp?: string | number },
    validity = `${JWT_EXPIRY_TIME_IN_HR}h`,
  ) {
    const cPayload = payload;
    delete cPayload?.exp;
    try {
      return sign(cPayload, JWT_SECRET_KEY, {
        expiresIn: validity,
      });
    } catch (error) {
      Logger.error('@jwtSign', error);
    }
  }

  public async jwtVerify(token: string): Promise<IJwtUser | null> {
    let decoded: IJwtUser | null = null;
    try {
      decoded = verify(token, JWT_SECRET_KEY) as IJwtUser & { expiry: Date };
    } catch (error) {
      Logger.error('@jwtSign', error);
    } finally {
      return decoded;
    }
  }

  public async encrypt(payload: any, validity = '1h') {
    try {
      return sign(payload, JWT_SECRET_KEY, {
        expiresIn: validity,
      });
    } catch (error) {
      Logger.error('@jwtSign', error);
    }
  }
  public async decrypt(token: string): Promise<any> {
    try {
      return Promise.resolve(verify(token, JWT_SECRET_KEY));
    } catch (error) {
      Logger.error('@jwtSign', error);
    }
  }

  public async encryptDevice(payload: any, validity = '720h') {
    try {
      return sign(payload, JWT_SECRET_KEY, {
        expiresIn: validity,
      });
    } catch (error) {
      Logger.error('@jwtSign', error);
    }
  }

  public async decryptDevice(token: string): Promise<any> {
    try {
      return verify(token, JWT_SECRET_KEY);
    } catch (error) {
      Logger.error('@jwtSign', error);
    }
  }

  public isEmpty(value: string | number | object): boolean {
    if (value === null) {
      return true;
    } else if (typeof value !== 'number' && value === '') {
      return true;
    } else if (typeof value === 'undefined' || value === undefined) {
      return true;
    } else if (
      value !== null &&
      typeof value === 'object' &&
      !Object.keys(value).length
    ) {
      return true;
    } else {
      return false;
    }
  }

  compareHash = async (password: string, hashedPassword: string) => {
    try {
      const bool = await bcrypt.compare(password, hashedPassword);
      return bool;
    } catch (e) {
      throw e;
    }
  };

  slugifyChar = (char: string) => {
    return slugify(char, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: false, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'vi', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
  };

  convertToNthDP = (value: number, dp: number) => {
    if (!value) return value;
    const convert = Number(value).toFixed(dp);
    return Math.abs(Number(convert));
  };
}
