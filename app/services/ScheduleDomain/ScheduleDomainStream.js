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

  const fromCondition =
    conditions.find(condition => condition.get('field') === 'start_at') ||
    Map();

  const toCondition =
    conditions.find(condition => condition.get('field') === 'stop_at') ||
    Map();

  const from = fromCondition.get('value', 0);
  const to = toCondition.get('value', 0);

  return { from, to };
}

export default new View(
  {
    queries: ScheduleReadyQueriesStream,
    loading: ScheduleLoadingStream,
  },
  data => {
    let rangesMap = OrderedMap();
    let idsMap = OrderedMap();
    data.get('queries').forEach((queryStatus, queryParams) => {
      const range = getRangeFromParams(queryParams);
      const queryData = queryStatus
        .get('data', List())
        .sortBy(item => new Date(item.get('start_at', 0).valueOf()));
      rangesMap = rangesMap.set(Map(range), queryData);
      queryData.forEach(item => {
        idsMap = idsMap.set(item.get('id'), item);
      });
    });

    return Map({
      loading: data.getIn(['loading', 'value'], false),
      ranges: rangesMap,
      all: idsMap,
    });
  }
);
