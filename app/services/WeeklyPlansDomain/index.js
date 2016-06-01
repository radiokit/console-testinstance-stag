import {
  Domain,
} from 'immview';
import stream from './WeeklyPlansDomainStream';
import actions from './WeeklyPlansDomainActions';

const WeeklyPlansDomain = new Domain(stream, actions);

export default WeeklyPlansDomain;
