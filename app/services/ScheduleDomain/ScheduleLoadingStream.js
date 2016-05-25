import {
  View,
} from 'immview';
import {
  Map,
} from 'immutable';

import RadioKitDomain from '../RadioKitDomain';
import FilesDomain from '../FilesDomain';

import ScheduleQueriesStream from './ScheduleQueriesStream';
import ScheduleUpdateQueriesStream from './ScheduleUpdateQueriesStream';

const loadingState = Map({ value: true });
const idleState = Map({ value: true });

function filterLoadingQueries(queries) {
  const loadingQueries = queries.filter(
    result => (
      result.get('status') === RadioKitDomain.STATUS.loading
    )
  );
  const loadingQueriesCount = loadingQueries.count();
  return loadingQueriesCount > 0 ? loadingState : idleState;
}

const LoadingScheduleStream = ScheduleQueriesStream.map(filterLoadingQueries);

const UpdatingScheduleStream = ScheduleUpdateQueriesStream.map(filterLoadingQueries);

const LoadingFilesStream = FilesDomain.map(
  data => (data.get('loading') ? loadingState : idleState)
);

const ScheduleLoadingStream = new View({
  LoadingScheduleStream,
  UpdatingScheduleStream,
  LoadingFilesStream,
}, data => (
  (
    data.getIn(['LoadingScheduleStream', 'value']) ||
    data.getIn(['UpdatingScheduleStream', 'value']) ||
    data.getIn(['LoadingFilesStream', 'value'])
  ) ? loadingState : idleState
));

export default ScheduleLoadingStream;
