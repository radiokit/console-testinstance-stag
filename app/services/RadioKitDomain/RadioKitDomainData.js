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
export const RadioKitDomainData = new Data(OrderedMap());
export default RadioKitDomainData;

export function update(queryData, status, data, time) {
  RadioKitDomainData.write(
    queries => queries.set(
      /** key */
      queryData,
      /** value */
      Map({
        status,
        data,
        time,
      })
    )
  );
};
