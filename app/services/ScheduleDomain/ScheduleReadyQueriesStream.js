import {
  pickReadyQueries,
} from '../RadioKitQueriesUtils';
import ScheduleQueriesStream from './ScheduleQueriesStream';

const ScheduleReadyQueriesStream = ScheduleQueriesStream.map(pickReadyQueries);

export default ScheduleReadyQueriesStream;
