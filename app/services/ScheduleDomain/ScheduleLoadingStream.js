import {
  View,
} from 'immview';
import {
  Map,
} from 'immutable';

import FilesDomain from '../FilesDomain';

import {
  pickLoadingQueries,
} from '../RadioKitQueriesUtils';

import {
  ScheduleQueriesStream,
  ScheduleUpdateQueriesStream,
} from './ScheduleQueriesStream';

const loadingState = Map({ value: true });
const idleState = Map({ value: false });

const LoadingScheduleQueriesStream = ScheduleQueriesStream.map(filterLoadingQueries);

const LoadingScheduleUpdateQueriesStream = ScheduleUpdateQueriesStream.map(filterLoadingQueries);

const LoadingFilesStream = FilesDomain.map(
  data => getBoolState(data.get('loading'))
);

const ScheduleLoadingStream = new View({
  LoadingScheduleQueriesStream,
  LoadingScheduleUpdateQueriesStream,
  LoadingFilesStream,
}, data => (
  getBoolState(
    data.getIn(['LoadingScheduleQueriesStream', 'value']) ||
    data.getIn(['LoadingScheduleUpdateQueriesStream', 'value']) ||
    data.getIn(['LoadingFilesStream', 'value'])
  )
));

export default ScheduleLoadingStream;

function getBoolState(condition) {
  return condition ? loadingState : idleState;
}

function filterLoadingQueries(queries) {
  const loadingQueries = pickLoadingQueries(queries);
  return getBoolState(loadingQueries.count() > 0);
}
