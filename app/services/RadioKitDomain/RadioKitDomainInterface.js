import {
  List,
  Map,
} from 'immutable';
import RadioKit from './../RadioKit';
import {RadioKitDomainData, update} from './RadioKitDomainData';

function checkIfQueryExists(queryParams, {autoSync = false, maxAge = Date.now()}) {
  const currentQueryStatus = RadioKitDomainData.read().getIn([queryParams, 'status']) || 'none';
  const currentQueryTime = RadioKitDomainData.read().getIn([queryParams, 'time']) || 0;
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
  update(queryParams, autoSync ? 'live' : 'loading', List(), autoSync ? null : Date.now());

  // Set up query execution hooks
  const markErroneous = e => {
    update(queryParams, 'error', List(), Date.now());
    (e instanceof Error) && console.warn(e.message || e);
  };

  q = q.on(
    'error',
    markErroneous
  );

  q = q.on(
    'fetch',
    (e, q, data) => update(queryParams, autoSync ? 'live' : 'done', data, autoSync ? null : Date.now())
  );

  // Execute query
  try {
    autoSync ? q.enableAutoUpdate() : q.fetch();
  } catch (e) {
    markErroneous(e);
  }
}
