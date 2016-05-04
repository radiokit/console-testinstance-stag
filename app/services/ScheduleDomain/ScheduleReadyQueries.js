import RadioKitDomain from '../RadioKitDomain';
import scheduleQueries from './ScheduleQueries';

const readyQueries = scheduleQueries.map(
  queries => queries.filter(
    result => (
      result.get('status') === RadioKitDomain.STATUS.live ||
      result.get('status') === RadioKitDomain.STATUS.done
    )
  )
);

export default readyQueries;
