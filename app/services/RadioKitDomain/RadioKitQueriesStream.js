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

RadioKitQueriesStream.subscribe(
  v => v && console.log('RadioKitQueriesStream', v.toJS())
);

export function update(queryParams, status, data, time) {
  console.log(
    'query mark dispatch',
    queryParams.get('app'),
    queryParams.get('model'),
    status,
    data && data.toJS && data.toJS()
  );
  RadioKitQueriesStream.write(
    queries => {
      console.log(
        'query mark execute',
        queryParams.get('app'),
        queryParams.get('model'),
        status,
        data && data.toJS && data.toJS()
      );
      return queries
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
        );
    }
  );
}
