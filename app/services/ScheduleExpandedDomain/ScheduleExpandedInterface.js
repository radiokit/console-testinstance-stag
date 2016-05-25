import ScheduleDomain from '../ScheduleDomain';
import { pushRange } from './ScheduleExpandedRangesStream';

export function fetch(from, to, broadcastChannelId, requestOptions) {
  pushRange(from, to);
  ScheduleDomain.fetch(from, to, broadcastChannelId, requestOptions);
}

export function save(id, patch) {
  ScheduleDomain.save(
    id,
    patch.set('file', patch.getIn(['file', 'id']))
  );
}
