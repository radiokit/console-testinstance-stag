import {
  Domain,
} from 'immview';
import WeeklyPlansDomainStream from './WeeklyPlansDomainStream';
import * as WeeklyPlansDomainInterface from './WeeklyPlansDomainInterface';

export default new Domain(
  WeeklyPlansDomainStream,
  WeeklyPlansDomainInterface
);
