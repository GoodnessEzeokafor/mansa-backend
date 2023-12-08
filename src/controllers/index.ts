import { ActivityController } from './activity';
import admin from './admin';
import { DealController } from './deal';

export default [...admin, DealController, ActivityController];
