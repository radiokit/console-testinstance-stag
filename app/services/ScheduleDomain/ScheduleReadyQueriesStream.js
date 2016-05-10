import RadioKitDomain from '../RadioKitDomain';
import ScheduleQueriesStream from './ScheduleQueriesStream';

const ScheduleReadyQueriesStream = ScheduleQueriesStream.map(
  queries => queries.filter(
    result => (
      result.get('status') === RadioKitDomain.STATUS.live ||
      result.get('status') === RadioKitDomain.STATUS.done
    )
  )
);

export default ScheduleReadyQueriesStream;
