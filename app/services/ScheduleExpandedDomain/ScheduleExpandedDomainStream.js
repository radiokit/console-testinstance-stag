import { Map } from 'immutable';
import { View } from 'immview';
import ScheduleExpandedRangesWithFilesStream from './ScheduleExpandedRangesWithFilesStream';
import ScheduleExpandedEntitiesWithFilesStream from './ScheduleExpandedEntitiesWithFilesStream';
import ScheduleExpandedLoadingStream from './ScheduleExpandedLoadingStream';

const ScheduleExpandedDomainStream = new View(
  {
    ScheduleExpandedRangesWithFilesStream,
    ScheduleExpandedEntitiesWithFilesStream,
    ScheduleExpandedLoadingStream,
  },
  data => {
    const ranges = data.get('ScheduleExpandedRangesWithFilesStream');
    const all = data.get('ScheduleExpandedEntitiesWithFilesStream');
    const loading = data.getIn(['ScheduleExpandedLoadingStream', 'value']);
    return Map({ all, ranges, loading });
  }
);

export default ScheduleExpandedDomainStream;
