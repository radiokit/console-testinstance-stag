import RadioKitDomain from '../RadioKitDomain';

import {
  updateKey,
} from './ScheduleConfig';

import {
  pickLoadingQueries,
} from '../RadioKitQueriesUtils';

const ScheduleUpdateQueriesStream = RadioKitDomain
  .map(pickLoadingQueries)
  .map(
    queries => queries.filter(
      (queryStatus, queryParams) => queryParams.get('key') === updateKey
    )
  );

export default ScheduleUpdateQueriesStream;
