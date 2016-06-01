import {
  fromJS,
} from 'immutable';

import moment from 'moment';

import {
  app,
  model,
  key,
  updateKey,
  readFields,
  updateFields,
} from './ScheduleConfig';

import RadioKitDomain from './../RadioKitDomain';

const actions = {
  /**
   * Get items from selected range.
   * Range can be anything that moment can transform.
   * @param {string|number} from
   * @param {string|number} to
   */
  fetch(from, to, broadcastChannelId, requestOptions) {
    RadioKitDomain.query(
      fromJS({
        [key]: true,
        app,
        model,
        select: readFields,
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
  },

  save(id, patch) {
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
  },

  clear() {
    RadioKitDomain.clear(app, model);
  },
};

export default actions;
