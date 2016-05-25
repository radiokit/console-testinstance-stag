import RadioKitDomain from '../RadioKitDomain';

import {
  updateKey,
} from './ScheduleConfig';

import {
  pickLoadingQueries,
} from '../RadioKitQueriesUtils';

const ScheduleUpdateQueriesStream = RadioKitDomain
  .map(
    data => pickLoadingQueries(data.get('queries'))
      .filter(
        (_, queryParams) => queryParams.get(updateKey)
      )
  );

export default ScheduleUpdateQueriesStream;
