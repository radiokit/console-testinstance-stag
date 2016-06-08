import {
  Map,
  OrderedMap,
  List,
} from 'immutable';
import ScheduleReadyQueriesStream from './ScheduleReadyQueriesStream';

const ScheduleRangesStream = ScheduleReadyQueriesStream.map(transformQueriesToRanges);

export default ScheduleRangesStream;

function transformQueriesToRanges(queries) {
  const rangesMap = OrderedMap().asMutable();
  queries.forEach((queryStatus, queryParams) => {
    const range = getRangeFromParams(queryParams);
    const queryData = queryStatus.get('data', List());
    rangesMap.set(Map(range), queryData);
  });
  return rangesMap.asImmutable();
}

function getRangeFromParams(queryParams) {
  const conditions = queryParams.get('conditions', List());

  let from = 0;
  let to = 0;

  conditions.forEach(condition => {
    if (condition.get('field') === 'stop_at') {
      from = condition.get('value', 0);
    }
    if (condition.get('field') === 'start_at') {
      to = condition.get('value', 0);
    }
  });

  return { from, to };
}
