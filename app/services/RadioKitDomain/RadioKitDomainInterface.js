import {
  List,
  Map,
} from 'immutable';
import RadioKit from './../RadioKit';
import DataSource from './RadioKitDomainData';

function updateDataSource(queryData, status, data, time) {
  DataSource.write(queriesData => queriesData.set(queryData, Map({
    status,
    data,
    time,
  })));
}

function checkIfQueryExists(queryParams, {autoSync = false, maxAge = Date.now()}) {
  const currentQueryStatus = DataSource.read().getIn([queryParams, 'status']) || 'none';
  const currentQueryTime = DataSource.read().getIn([queryParams, 'time']) || 0;
  if (autoSync) {
    // Check if query is currently loading or registered to receive updates
    if (currentQueryStatus === 'live') {
      return true;
    }
  } else {
    // Check if query execution time is acceptable
    if (
      (currentQueryStatus === 'loading') ||
      (currentQueryStatus === 'done' && currentQueryTime > Date.now() - maxAge)
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Perform a query agains RadioKit API
 * @param {Map{
 *    app: string,
 *    model: string,
 *    select: List<string>,
 *    conditions:List<Map{field:string,comparison:string,value:string}>
 * }} queryParams
 * @param {{
 *  autoSync: bool,
 *  maxAge: number
 * }} options
 */
export function query(queryParams = Map(), options = {}) {
  const {app, model, select, conditions} = queryParams.toObject();

  if (checkIfQueryExists(queryParams, options)) {
    return;
  }

  // Build a query
  let q = RadioKit.query(app, model);
  select.forEach(field => {
    q = q.select(field);
  });
  conditions.forEach(condition => {
    const {field, comparison, value} = condition.toObject();
    q = q.where(field, comparison, value);
  });

  const {autoSync = false} = options;

  // Initialize query in storage
  updateDataSource(queryParams, autoSync ? 'live' : 'loading', List(), autoSync ? null : Date.now());

  // Set up query execution hooks
  q = q.on('error', () => updateDataSource(queryParams, 'error', List(), Date.now()));

  q = q.on(
    'fetch',
    (e, q, data) => updateDataSource(queryParams, autoSync ? 'live' : 'done', data, autoSync ? null : Date.now())
  );

  // Execute query
  autoSync ? q.enableAutoUpdate() : q.fetch();
}
