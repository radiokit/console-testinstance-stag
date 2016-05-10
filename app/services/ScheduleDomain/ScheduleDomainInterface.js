import {
  Map,
  List,
} from 'immutable';

import moment from 'moment';

const app = 'plumber';
const model = 'Media.Input.File.Http';

import RadioKitDomain from './../RadioKitDomain';
import RecordURI from '../RecordURI';

function performQuery(from, to, options) {
  RadioKitDomain.query(
    Map({
      key: 'schedule',
      app,
      model,
      select: List(['id', 'name', 'start_at', 'stop_at', 'location']),
      conditions: List([
        from ? Map({
          field: 'start_at',
          comparison: 'gte',
          value: moment(from).toISOString(),
        }) : null,
        to ? Map({
          field: 'stop_at',
          comparison: 'lte',
          value: moment(to).toISOString(),
        }) : null,
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

export function save(id, patch) {
  RadioKitDomain.save(
    Map({
      key: 'schedule:update',
      app,
      model,
      id,
    }),
    patch
      .delete('file')
      .set('location', RecordURI.to('vault', 'Data.Record.File', patch.getIn(['file', 'id'])))
  );
}

export function clear() {
  RadioKitDomain.clear(app, model);
}
