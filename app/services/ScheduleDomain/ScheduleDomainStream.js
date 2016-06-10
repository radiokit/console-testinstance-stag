import {
  View,
} from 'immview';

import {
  Map,
} from 'immutable';
import {
  app,
  model,
} from './ScheduleConfig';
import RadioKitDomain from '../RadioKitDomain';
import ScheduleLoadingStream from './ScheduleLoadingStream';
import ScheduleRangesStream from './ScheduleRangesStream';

const ScheduleDomainStream = new View(
  {
    ranges: ScheduleRangesStream,
    entities: RadioKitDomain.map(data => data.getIn(['entities', app, model], Map())),
    loading: ScheduleLoadingStream,
  },
  (data) => (
    Map({
      loading: data.getIn(['loading', 'value']),
      ranges: data.get('ranges'),
      all: data.get('entities'),
    })
  )
);

export default ScheduleDomainStream;
