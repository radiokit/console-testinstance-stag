import {
  Data,
} from 'immview';
import {
  fromJS,
} from 'immutable';

export const ScheduleExpandedRangesStream = new Data(fromJS([]));

export default ScheduleExpandedRangesStream;

export function pushRange(from, to) {
  ScheduleExpandedRangesStream.write(
    ScheduleExpandedRanges => ScheduleExpandedRanges
      .push(fromJS({ from, to }))
  );
}
