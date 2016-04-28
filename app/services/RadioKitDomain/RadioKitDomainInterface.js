import {
  List,
  Map,
} from 'immutable';
import RadioKit from '../RadioKit';
import { RadioKitQueries, update } from './RadioKitQueries';
import { save, remove } from './RadioKitMutator';
import * as QUERY_STATUS from './RadioKitQueryStatuses';

function checkIfQueryExists(queryParams, { autoSync = false, maxAge = Date.now() }) {
  const currentQueryStatus = RadioKitQueries.read().getIn([queryParams, 'status']);
  const currentQueryTime = RadioKitQueries.read().getIn([queryParams, 'time']) || 0;
  if (autoSync) {
    // Check if query is currently loading or registered to receive updates
    if (currentQueryStatus === 'live') {
      return true;
    }
  } else {
    // Check if query execution time is acceptable
    if (
      (currentQueryStatus === QUERY_STATUS.loading) ||
      (currentQueryStatus === QUERY_STATUS.done && currentQueryTime > Date.now() - maxAge)
    ) {
      return true;
    }
  }
  return false;
}

function buildQuery(queryParams) {
  const { app, model, select, conditions, joins } = queryParams.toObject();
  let q = RadioKit.query(app, model);
  select && select.forEach(field => {
    q = q.select(field);
  });
  conditions && conditions.forEach(condition => {
    const { field, comparison, value } = condition.toObject();
    q = q.where(field, comparison, value);
  });
  joins && joins.forEach(join => {
    q = q.joins(join);
  });
  return q;
}

/**
 * Perform a query agains RadioKit API
 * @param {Map{
 *    app: string,
 *    model: string,
 *    select: List<string>,
 *    joins: List<string>,
 *    conditions:List<Map{field:string,comparison:string,value:string}>
 * }} queryParams
 * @param {{
 *  autoSync: bool,
 *  maxAge: number
 * }} options
 */
function query(queryParams = Map(), options = {}) {
  if (checkIfQueryExists(queryParams, options)) {
    return;
  }

  let q = buildQuery(queryParams);

  const { autoSync = false } = options;

    // Initialize query in storage
  if (autoSync) {
    update(queryParams, QUERY_STATUS.live, List(), Date.now());
  } else {
    update(queryParams, QUERY_STATUS.loading, List(), Date.now());
  }

    // Set up query execution hooks
  const markAsErroneous = () => {
    update(queryParams, QUERY_STATUS.error, List(), Date.now());
  };

  q = q
    .on('error', markAsErroneous)
    .on('fetch', (__, _, data) => update(
      queryParams,
      autoSync ? QUERY_STATUS.live : QUERY_STATUS.done,
      data,
      autoSync ? null : Date.now()
    ));

  // Execute query
  try {
    autoSync ? q.enableAutoUpdate() : q.fetch();
  } catch (e) {
    markAsErroneous(e);
  }
}

function clear(app, model = null) {
  RadioKitQueries.write(
    RKDData => RKDData
      .filter(
        (status, params) => !(
          params.get('app') === app &&
          (
            model === null ||
            params.get('model') === model
          )
        )
      )
  );
}

export {
  query,
  clear,
  save,
  remove,
};
