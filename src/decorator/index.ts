import { SetMetadata } from '@nestjs/common';
export const IsAdmin = (tag: boolean) => SetMetadata('is-admin', tag);
