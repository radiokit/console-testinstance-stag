import RadioKitDomain from '../RadioKitDomain';

import {
  key,
} from './ScheduleConfig';

const ScheduleQueriesStream = RadioKitDomain.map(
  RKDData => RKDData.filter((queryStatus, queryParams) => queryParams.get(key))
);

export default ScheduleQueriesStream;
