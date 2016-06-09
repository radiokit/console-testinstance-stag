import {
  fromJS,
} from 'immutable';

import moment from 'moment';

import {
  app,
  model,
  key,
  rangeKey,
  updateKey,
  readFields,
  updateFields,
} from './ScheduleConfig';

import RadioKitDomain from './../RadioKitDomain';

const actions = {
  fetch,
  save,
  clear,
};

export default actions;

/**
 * Get items from selected range.
 * Range can be anything that moment can transform.
 * @param {string|number} from
 * @param {string|number} to
 * @param {number} broadcastChannelId
 * @param {object} requestOptions - Request options object just passed to RadioKitDomain as is
 */
function fetch(from, to, broadcastChannelId, requestOptions) {
  RadioKitDomain.query(
    fromJS({
      [key]: true,
      app,
      model,
      select: readFields,
      [rangeKey]: { from, to, broadcastChannelId },
      conditions: [
        broadcastChannelId ? {
          field: 'references',
          comparison: 'deq',
          value: `broadcast_channel_id ${broadcastChannelId}`,
        } : null,
        from ? {
          field: 'start_at',
          comparison: 'lte',
          value: moment(to).toISOString(),
        } : null,
        to ? {
          field: 'stop_at',
          comparison: 'gte',
          value: moment(from).toISOString(),
        } : null,
      ].filter(i => !!i),
    }),
    requestOptions
  );
}

function save(id, patch) {
  if (!id) {
    throw new Error('ScheduleDomain:save no id');
  }

  RadioKitDomain.save(
    fromJS({
      [updateKey]: true,
      app,
      model,
      id,
    }),
    patch
      .filter((_, field) => updateFields.indexOf(field) >= 0)
  );
}

function clear() {
  RadioKitDomain.clear(app, model);
}
