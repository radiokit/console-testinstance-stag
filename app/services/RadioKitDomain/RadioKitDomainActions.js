import {
  List,
  Map,
} from 'immutable';
import RadioKit from '../RadioKit';
import { RadioKitQueriesStream, update } from './RadioKitQueriesStream';
import { save, remove } from './RadioKitMutator';
import * as STATUS from './RadioKitQueryStatuses';

function getPreviousQuery(queryParams) {
  return RadioKitQueriesStream.read().getIn([queryParams]);
}

function checkIfQueryExists(queryParams, { autoSync = false, maxAge = Date.now() }) {
  const currentQueryStatus = RadioKitQueriesStream.read().getIn([queryParams, 'status']);
  const currentQueryTime = RadioKitQueriesStream.read().getIn([queryParams, 'time']) || 0;
  if (autoSync) {
    if (currentQueryStatus === 'live') {
      return true;
    }
  } else {
    // Check if query execution time is acceptable
    if (
      currentQueryStatus === STATUS.loading ||
      (
        currentQueryStatus === STATUS.done &&
        currentQueryTime > Date.now() - maxAge
      )
    ) {
      return true;
    }
  }
  return false;
}

function buildQuery(queryParams) {
  const { app, model, select, conditions, joins, limit, offset } = queryParams.toObject();
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
  if (typeof limit === 'number') {
    q = q.limit(limit);
  }
  if (typeof offset === 'number') {
    q = q.offset(offset);
  }
  return q;
}

const actions = {
  /**
   * Perform a query against RadioKit API
   * @param {Map{
   *    app: string,
   *    model: string,
   *    select: List<string>,
   *    joins: List<string>,
   *    conditions:List<Map{field:string,comparison:string,value:string}>
   * }} queryParams
   * @param {{
   *  autoSync: bool,
   *  maxAge: number,
   *  noLoadingState: bool
   * }} options
   */
  query(queryParams = Map(), options = {}) {
    if (checkIfQueryExists(queryParams, options)) {
      return;
    }

    let q = buildQuery(queryParams);

    const {
      autoSync = false,
      noLoadingState = false,
    } = options;

    const requestTime = Date.now();

    // Initialize query in storage
    const existingQuery = getPreviousQuery(queryParams);
    if (!existingQuery || !noLoadingState) {
      if (autoSync) {
        update(queryParams, STATUS.live, List(), requestTime);
      } else {
        update(queryParams, STATUS.loading, List(), requestTime);
      }
    }

    // Set up query execution hooks
    const markAsErroneous = e => {
      update(queryParams, STATUS.error, List(), requestTime);
      /* eslint no-console: 0 */
      console.error('RadioKitDomain::query', 'request failed', e.message, e.stack);
    };

    q = q
      .on('error', markAsErroneous)
      .on('fetch', (__, _, data) => update(
        queryParams,
        autoSync ? STATUS.live : STATUS.done,
        data,
        autoSync ? null : requestTime
      ));

    // Execute query
    try {
      autoSync ? q.enableAutoUpdate() : q.fetch();
    } catch (e) {
      markAsErroneous(e);
    }
  },

  clear(app, model = null) {
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
  },

  save,

  remove,
};

export default actions;
