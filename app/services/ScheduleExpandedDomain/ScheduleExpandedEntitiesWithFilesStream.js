import ScheduleExpandedRangesWithFilesStream from './ScheduleExpandedRangesWithFilesStream';
import { indexBy } from '../RadioKitQueriesUtils';

export default ScheduleExpandedRangesWithFilesStream.map(
  ranges => ranges.map(indexBy('id')).flatten(true)
);
