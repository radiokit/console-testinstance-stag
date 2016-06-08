import {
  Map,
} from 'immutable';
import {
  View,
} from 'immview';
import WeeklyPlansEntitiesStream from './ContentTypesEntitiesStream';
import WeeklyPlansLoadingStream from './ContentTypesLoadingStream';

const ContentTypesDomainStream = new View(
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

export default ContentTypesDomainStream;
