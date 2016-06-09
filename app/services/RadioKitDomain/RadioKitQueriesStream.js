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
const RadioKitQueriesStream = new Data(OrderedMap());

export {
  RadioKitQueriesStream as default,
  RadioKitQueriesStream,
  updateQueryInQueriesStream,
};

function updateQueryInQueriesStream(queryParams, status, data, time) {
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
