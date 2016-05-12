import ScheduleDomain from '../ScheduleDomain';
import { pushRange } from './ScheduleExpandedRangesStream';

export function fetch(from, to, requestOptions) {
  pushRange(from, to);
  ScheduleDomain.fetch(from, to, requestOptions);
}

export function save(id, patch) {
  ScheduleDomain.save(
    id,
    patch.set('file', patch.getIn(['file', 'id']))
  );
}
