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

function filterLoadingQueries(queries) {
  const loadingQueries = queries.filter(
    result => (
      result.get('status') === RadioKitDomain.STATUS.loading
    )
  );
  const loadingQueriesCount = loadingQueries.count();
  return Map({
    value: loadingQueriesCount > 0,
  });
}

const LoadingScheduleStream = ScheduleQueriesStream.map(filterLoadingQueries);

const UpdatingScheduleStream = ScheduleUpdateQueriesStream.map(filterLoadingQueries);

const LoadingFilesStream = FilesDomain.map(data => Map({ value: data.get('loading') }));

const ScheduleLoadingStream = new View({
  LoadingScheduleStream,
  UpdatingScheduleStream,
  LoadingFilesStream,
}, data => Map({
  value: (
    data.getIn(['LoadingScheduleStream', 'value']) ||
    data.getIn(['UpdatingScheduleStream', 'value']) ||
    data.getIn(['LoadingFilesStream', 'value'])
  ),
}));

export default ScheduleLoadingStream;
