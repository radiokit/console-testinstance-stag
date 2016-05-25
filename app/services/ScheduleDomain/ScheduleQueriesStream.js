import RadioKitDomain from '../RadioKitDomain';

import {
  key,
} from './ScheduleConfig';

const ScheduleQueriesStream = RadioKitDomain.map(
  data => data
    .get('queries')
    .filter((queryStatus, queryParams) => queryParams.get(key))
);

export default ScheduleQueriesStream;
