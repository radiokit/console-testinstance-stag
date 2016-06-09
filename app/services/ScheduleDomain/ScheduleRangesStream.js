import {
  Map,
  OrderedMap,
  List,
} from 'immutable';
import {
  rangeKey,
} from './ScheduleConfig';
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
  return queryParams.get(rangeKey);
}
