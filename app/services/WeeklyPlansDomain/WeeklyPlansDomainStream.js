import {
  View,
} from 'immview';
import WeeklyPlansEntitiesStream from './WeeklyPlansEntitiesStream';
import WeeklyPlansLoadingStream from './WeeklyPlansLoadingStream';

export default new View(
  {
    entities: WeeklyPlansEntitiesStream,
    loading: WeeklyPlansLoadingStream,
  },
  function WeeklyPlansDomainProcess(data) {
    return data.set('loading', data.getIn(['loading', 'value']));
  }
);
