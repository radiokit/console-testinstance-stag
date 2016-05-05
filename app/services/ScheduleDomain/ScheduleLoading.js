import {
  View,
} from 'immview';
import {
  Map,
} from 'immutable';

import RadioKitDomain from '../RadioKitDomain';
import VaultDomain from '../VaultDomain';

import ScheduleQueries from './ScheduleQueries';
import ScheduleUpdateQueries from './ScheduleUpdateQueries';

function filterLoadingQueries(queries) {
  return Map({ value: queries.filter(
    result => (
      result.get('status') === RadioKitDomain.STATUS.loading
    )
  ).count() > 0 });
}

const loadingSchedule = ScheduleQueries.map(filterLoadingQueries);

const updatingSchedule = ScheduleUpdateQueries.map(filterLoadingQueries);

const loadingVault = VaultDomain.map(data => Map({ value: data.get('loading') }));

const loading = new View({
  loadingSchedule,
  updatingSchedule,
  loadingVault,
}, data => Map({
  value: (
    data.getIn(['loadingSchedule', 'value']) ||
    data.getIn(['updatingSchedule', 'value']) ||
    data.getIn(['loadingVault', 'value'])
  ),
}));

export default loading;
