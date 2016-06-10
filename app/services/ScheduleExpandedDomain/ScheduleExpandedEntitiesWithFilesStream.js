import ScheduleExpandedRangesWithFilesStream from './ScheduleExpandedRangesWithFilesStream';
import { indexBy } from '../RadioKitQueriesUtils';

const indexById = indexBy('id');

const ScheduleExpandedEntitiesWithFilesStream = ScheduleExpandedRangesWithFilesStream.map(
  ranges => ranges.map(indexById).flatten(true)
);

export default ScheduleExpandedEntitiesWithFilesStream;
