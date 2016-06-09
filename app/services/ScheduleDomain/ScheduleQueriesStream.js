import RadioKitDomain from '../RadioKitDomain';

import {
  key,
  updateKey,
} from './ScheduleConfig';

const RadioKitQueriesStream = RadioKitDomain.map(
  data => data.get('queries')
);

const ScheduleQueriesStream = RadioKitQueriesStream.map(
  queries => queries.filter(
    (_, queryParams) => queryParams.get(key)
  )
);

const ScheduleUpdateQueriesStream = RadioKitQueriesStream.map(
  queries => queries.filter(
    (_, queryParams) => queryParams.get(updateKey)
  )
);

export {
  ScheduleQueriesStream,
  ScheduleUpdateQueriesStream,
};
