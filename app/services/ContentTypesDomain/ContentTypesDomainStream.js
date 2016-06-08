import {
  Map,
} from 'immutable';
import {
  View,
} from 'immview';
import WeeklyPlansEntitiesStream from './WeeklyPlansEntitiesStream';
import WeeklyPlansLoadingStream from './WeeklyPlansLoadingStream';

const WeeklyPlansDomainStream = new View(
  {
    entities: WeeklyPlansEntitiesStream,
    loading: WeeklyPlansLoadingStream,
  },
  function WeeklyPlansDomainProcess(data) {
    return Map({
      entities: data.get('entities'),
      loading: data.getIn(['loading', 'value']),
    });
  }
);

export default WeeklyPlansDomainStream;
