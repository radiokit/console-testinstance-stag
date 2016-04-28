import {
  Map,
  List,
} from 'immutable';

import moment from 'moment';

const key = 'schedule';
const app = 'plumber';
const model = 'Media.Input.File.Http';

import RadioKitDomain from './../RadioKitDomain';

function performQuery(from, to, options) {
  RadioKitDomain.query(
    Map({
      key,
      app,
      model,
      select: List(['id', 'name', 'start_at', 'stop_at', 'location']),
      conditions: List([
        from ? Map({
          field: 'start_at',
          comparison: 'gte',
          value: moment(from).toISOString(),
        }) : null,
        to ? Map({ field: 'stop_at', comparison: 'lte', value: moment(to).toISOString() }) : null,
      ]).filter(i => !!i),
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

/**
 * Get items from selected range and keeps them updated.
 * Range can be anything that moment can transform.
 * @param {string|number} from
 * @param {string|number} to
 */
export function observe(from, to) {
  performQuery(from, to, { autoSync: true });
}

export function save(id, patch) {
  RadioKitDomain.save(
    Map({
      key: `${key}update`,
      app,
      model,
      id,
    }),
    patch
      .delete('file')
      .set('location', `record://vault/Data.Record.File/${patch.getIn(['file', 'id'])}`)
  );
}

export function clear() {
  RadioKitDomain.clear(app, model);
}
