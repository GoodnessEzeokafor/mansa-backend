import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LogsMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');
    constructor() { }

    use(request: Request, response: Response, next: NextFunction) {
        response.on('finish', async () => {
            try {
                const { method, originalUrl } = request
                const { statusCode, statusMessage } = response;
                const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;

                if (statusCode >= 500) return this.logger.error(message);
                if (statusCode >= 400) return this.logger.error(message);
                return this.logger.log(message);

            } catch (error) {
                Logger.error(`[logs-middleware]`, error)
            }

        });

        next();
    }
}



export default LogsMiddleware;