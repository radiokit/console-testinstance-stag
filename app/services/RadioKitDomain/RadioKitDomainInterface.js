import {
  List,
  Map,
} from 'immutable';
import RadioKit from './../RadioKit';
import { RadioKitDomainData, update } from './RadioKitDomainData';

const QUERY_STATUS = {
  live: 'live',
  loading: 'loading',
  done: 'done',
  error: 'error',
};

function checkIfQueryExists(queryParams, { autoSync = false, maxAge = Date.now() }) {
  const currentQueryStatus = RadioKitDomainData.read().getIn([queryParams, 'status']);
  const currentQueryTime = RadioKitDomainData.read().getIn([queryParams, 'time']) || 0;
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
export function query(queryParams = Map(), options = {}) {
  if (checkIfQueryExists(queryParams, options)) {
    return;
  }

  let q = buildQuery(queryParams);

  const { autoSync = false } = options;

    // Initialize query in storage
  if (autoSync) {
    update(queryParams, QUERY_STATUS.live, List(), null);
  } else {
    update(queryParams, QUERY_STATUS.loading, List(), Date.now());
  }

    // Set up query execution hooks
  const markErroneous = () => {
    update(queryParams, 'error', List(), Date.now());
  };

  q = q.on('error', markErroneous);

  q = q.on('fetch', (__, _, data) => update(
    queryParams,
    autoSync ? QUERY_STATUS.live : QUERY_STATUS.done,
    data,
    autoSync ? null : Date.now()
  ));

  // Execute query
  try {
    autoSync ? q.enableAutoUpdate() : q.fetch();
  } catch (e) {
    markErroneous(e);
  }
}

export function clear(app, model = null) {
  RadioKitDomainData.write(
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
