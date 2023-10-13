import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor(message: string, error?: any) {
    super(message, HttpStatus.CONFLICT, {
      cause: new Error(error),
    });
  }
}

export class DoesNotExistsException extends HttpException {
  constructor(message: string, error?: any) {
    super(message, HttpStatus.NOT_FOUND, {
      cause: new Error(error),
    });
  }
}

export class BadRequestsException extends HttpException {
  constructor(message: string, error?: any) {
    super(message, HttpStatus.BAD_REQUEST, {
      cause: new Error(error),
    });
  }
}

export class UnAuthorizedException extends HttpException {
  constructor(message: string, error?: any) {
    super(message, HttpStatus.UNAUTHORIZED, {
      cause: new Error(error),
      // state:'error'
    });
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(message: string, error?: any) {
    super(message, HttpStatus.TOO_MANY_REQUESTS, {
      cause: new Error(error),
    });
  }
}

export class ForbiddenRequestException extends HttpException {
  constructor(message: string, error?: any) {
    super(message, HttpStatus.FORBIDDEN, {
      cause: new Error(error),
    });
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message: string, error?: any) {
    super(message, HttpStatus.SERVICE_UNAVAILABLE, {
      cause: new Error(error),
    });
  }
}