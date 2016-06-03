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
export const RadioKitQueriesStream = new Data(OrderedMap());
export default RadioKitQueriesStream;

export function update(queryParams, status, data, time) {
  RadioKitQueriesStream.write(
    queries => (
      queries
        .set(
          /** key */
          queryParams,
          /** value */
          Map({
            status,
            data,
            time,
          })
        )
        .sortBy(
          value => value.get('time', Number.MAX_VALUE)
        )
      )
  );
}
