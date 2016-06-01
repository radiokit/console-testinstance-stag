import ScheduleExpandedRangesWithFilesStream from './ScheduleExpandedRangesWithFilesStream';
import { indexBy } from '../RadioKitQueriesUtils';

const ScheduleExpandedEntitiesWithFilesStream = ScheduleExpandedRangesWithFilesStream.map(
  ranges => ranges.map(indexBy('id')).flatten(true)
);

export default ScheduleExpandedEntitiesWithFilesStream;
