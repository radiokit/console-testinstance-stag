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
      (_, queryParams) => queryParams.get(updateKey)
    )
  );

export default ScheduleUpdateQueriesStream;
