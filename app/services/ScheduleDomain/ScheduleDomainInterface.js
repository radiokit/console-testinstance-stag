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

function performQuery(from, to, options) {
  RadioKitDomain.query(
    fromJS({
      [key]: true,
      app,
      model,
      select: readFields,
      conditions: [
        from ? {
          field: 'start_at',
          comparison: 'gte',
          value: moment(from).toISOString(),
        } : null,
        to ? {
          field: 'stop_at',
          comparison: 'lte',
          value: moment(to).toISOString(),
        } : null,
      ].filter(i => !!i),
    }),
    options
  );
}

/**
 * Get items from selected range.
 * Range can be anything that moment can transform.
 * @param {string|number} from
 * @param {string|number} to
 */
export function fetch(from, to, maxAge = 1000) {
  performQuery(from, to, { maxAge });
}

export function save(id, patch) {
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
      .set('file', patch.getIn(['file', 'id']))
      .filter((_, field) => updateFields.indexOf(field) >= 0)
  );
}

export function clear() {
  RadioKitDomain.clear(app, model);
}
