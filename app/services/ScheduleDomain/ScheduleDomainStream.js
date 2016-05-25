import {
  View,
} from 'immview';

import {
  Map,
  OrderedMap,
  List,
} from 'immutable';
import {
  app,
  model,
} from './ScheduleConfig';
import RadioKitDomain from '../RadioKitDomain';
import ScheduleLoadingStream from './ScheduleLoadingStream';
import ScheduleReadyQueriesStream from './ScheduleReadyQueriesStream';

function getRangeFromParams(queryParams) {
  const conditions = queryParams.get('conditions', List());

  let from = 0;
  let to = 0;

  conditions.forEach(condition => {
    if (condition.get('field') === 'start_at') {
      from = condition.get('value', 0);
    }
    if (condition.get('field') === 'stop_at') {
      to = condition.get('value', 0);
    }
  });

  return { from, to };
}

export default new View(
  {
    queries: ScheduleReadyQueriesStream,
    entities: RadioKitDomain.map(data => data.getIn(['entities', app, model], Map())),
    loading: ScheduleLoadingStream,
  },
  (data) => {
    const rangesMap = OrderedMap().asMutable();
    data.get('queries').forEach((queryStatus, queryParams) => {
      const range = getRangeFromParams(queryParams);
      const queryData = queryStatus.get('data', List());
      rangesMap.set(Map(range), queryData);
    });

    return Map({
      loading: !!data.getIn(['loading', 'value']),
      ranges: rangesMap.asImmutable(),
      all: data.get('entities'),
    });
  }
);
