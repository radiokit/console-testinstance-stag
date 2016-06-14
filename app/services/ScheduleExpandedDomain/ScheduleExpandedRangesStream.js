import {
  Data,
} from 'immview';
import {
  Map,
  List,
} from 'immutable';

const ScheduleExpandedRangesStream = new Data(List());

export {
  ScheduleExpandedRangesStream,
  ScheduleExpandedRangesStream as default,
  pushRange,
};

function pushRange(from, to, broadcastChannelId) {
  ScheduleExpandedRangesStream.write(
    ScheduleExpandedRanges =>
      ScheduleExpandedRanges.push(Map({ from, to, broadcastChannelId }))
  );
}
