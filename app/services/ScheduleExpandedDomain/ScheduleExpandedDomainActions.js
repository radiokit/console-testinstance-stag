import ScheduleDomain from '../ScheduleDomain';
import { pushRange } from './ScheduleExpandedRangesStream';

const actions = {
  fetch(from, to, broadcastChannelId, requestOptions) {
    pushRange(from, to);
    ScheduleDomain.fetch(from, to, broadcastChannelId, requestOptions);
  },

  save(id, patch) {
    ScheduleDomain.save(
      id,
      patch.set('file', patch.getIn(['file', 'id']))
    );
  },
};

export default actions;
