import {
  Data,
} from 'immview';
import {
  OrderedMap,
  Map,
} from 'immutable';

/**
 * OrderedMap<queryParams,Map{status,data,time}>
 */
export const RadioKitQueries = new Data(OrderedMap());
export default RadioKitQueries;

export function update(queryParams, status, data, time) {
  RadioKitQueries.write(
    queries => queries.set(
      /** key */
      queryParams,
      /** value */
      Map({
        status,
        data,
        time,
      })
    )
  );
}

export const QUERY_STATUS = {
  live: 'live',
  loading: 'loading',
  done: 'done',
  error: 'error',
};
