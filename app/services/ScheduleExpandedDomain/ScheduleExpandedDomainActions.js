import ScheduleDomain from '../ScheduleDomain';
import { pushRange } from './ScheduleExpandedRangesStream';

const actions = {
  fetch,
  save,
};

export default actions;

function fetch(from, to, broadcastChannelId, requestOptions) {
  pushRange(from, to, broadcastChannelId);
  ScheduleDomain.fetch(from, to, broadcastChannelId, requestOptions);
}

function save(id, patch) {
  ScheduleDomain.save(
    id,
    patch.set('file', patch.getIn(['file', 'id']))
  );
}
