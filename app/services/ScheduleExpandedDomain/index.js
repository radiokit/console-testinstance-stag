import {
  Domain,
} from 'immview';

import stream from './ScheduleExpandedDomainStream';
import actions from './ScheduleExpandedDomainActions';

const ScheduleExpandedDomain = new Domain(stream, actions);

export default ScheduleExpandedDomain;
