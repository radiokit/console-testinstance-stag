import {
  List,
  Map,
} from 'immutable';
import RadioKit from '../RadioKit';
import { RadioKitQueriesStream, updateQueryInQueriesStream } from './RadioKitQueriesStream';
import { save, remove } from './RadioKitMutator';
import * as STATUS from './RadioKitQueryStatuses';

const actions = {
  query,
  clear,
  save,
  remove,
};

export default actions;

/**
 * Perform a query against RadioKit API
 * @param { Map{
   *    app: string,
   *    model: string,
   *    select: List<string>,
   *    joins: List<string>,
   *    conditions:List<Map{field:string,comparison:string,value:string}>,
   *    order: Map<field:string, direction:string}>,
   *    *,
   * } } queryParams
 * @param { {
   *  autoSync: bool,
   *  maxAge: number,
   *  noLoadingState: bool
   * } } options
 */

function query(queryParams = Map(), options = {}) {
  if (checkIfQueryExists(queryParams, options)) {
    return;
  }

  const radioKitQuery = buildQuery(queryParams);

  const {
    autoSync = false,
    noLoadingState = false,
  } = options;

  const requestTime = Date.now();

  // Initialize query in storage
  const existingQuery = getPreviousQuery(queryParams);
  if (!existingQuery || !noLoadingState) {
    if (autoSync) {
      updateQueryInQueriesStream(queryParams, STATUS.live, List(), requestTime);
    } else {
      updateQueryInQueriesStream(queryParams, STATUS.loading, List(), requestTime);
    }
  }

  // Set up query execution hooks
  const markAsErroneous = e => {
    updateQueryInQueriesStream(queryParams, STATUS.error, List(), requestTime);
    /* eslint no-console: 0 */
    console.error('RadioKitDomain::query', 'request failed', e.message, e.stack);
  };

  const radioKitQueryHandled = radioKitQuery
    .on('error', markAsErroneous)
    .on('fetch', (__, _, data) => updateQueryInQueriesStream(
      queryParams,
      autoSync ? STATUS.live : STATUS.done,
      data,
      requestTime
    ));

  // Execute query
  try {
    autoSync ? radioKitQueryHandled.enableAutoUpdate() : radioKitQueryHandled.fetch();
  } catch (e) {
    markAsErroneous(e);
  }
}

function checkIfQueryExists(queryParams, { autoSync = false, maxAge = Date.now() }) {
  const currentQueryStatus = RadioKitQueriesStream.read().getIn([queryParams, 'status']);
  const currentQueryTime = RadioKitQueriesStream.read().getIn([queryParams, 'time']) || 0;

  if (autoSync) {
    return currentQueryStatus === 'live';
  }

  // Check if query execution time is acceptable
  return (
    currentQueryStatus === STATUS.loading ||
    (
      currentQueryStatus === STATUS.done &&
      currentQueryTime > Date.now() - maxAge
    )
  );
}

function getPreviousQuery(queryParams) {
  return RadioKitQueriesStream.read().getIn([queryParams]);
}

function buildQuery(queryParams) {
  const {
    app,
    model,
    select,
    conditions,
    joins,
    limit,
    offset,
    order,
  } = queryParams.toObject();

  let q = RadioKit.query(app, model);

  select && select.forEach(field => {
    q = q.select(field);
  });
  conditions && conditions.forEach(condition => {
    if (!condition) {
      return;
    }
    const { field, comparison, value } = condition.toObject();
    q = q.where(field, comparison, value);
  });
  joins && joins.forEach(join => {
    if (!join) {
      return;
    }
    q = q.joins(join);
  });
  if (typeof limit === 'number' || typeof offset === 'number') {
    q = q.limit(limit);
    q = q.offset(offset);
  }
  if (order) {
    q.order(order.get('field'), order.get('direction'));
  }
  return q;
}

function clear(app, model = null) {
  RadioKitQueriesStream.write(
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
