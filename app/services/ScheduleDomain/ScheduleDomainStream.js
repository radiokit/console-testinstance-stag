import {
  View,
} from 'immview';

import {
  Map,
  OrderedMap,
  List,
} from 'immutable';

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
    loading: ScheduleLoadingStream,
  },
  (data) => {
    const rangesMap = OrderedMap().asMutable();
    const idsMap = {};
    data.get('queries').forEach((queryStatus, queryParams) => {
      const range = getRangeFromParams(queryParams);
      const queryData = queryStatus.get('data', List());
      rangesMap.set(Map(range), queryData);
      queryData.forEach(item => {
        idsMap[item.get('id')] = item;
      });
    });

    return Map({
      loading: data.getIn(['loading', 'value'], false),
      ranges: rangesMap.asImmutable(),
      all: OrderedMap(idsMap),
    });
  }
);
