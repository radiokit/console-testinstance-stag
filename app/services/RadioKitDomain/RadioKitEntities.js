import {
  View,
} from 'immview';
import {
  Map,
  List,
} from 'immutable';
import { RadioKitQueries } from './RadioKitQueries';
import * as QUERY_STATUS from './RadioKitQueryStatuses';

/**
 * Map<
 *  app:string,
 *  Map<
 *    model:string,
 *    Map<
 *      id:string,
 *      Map<string,*>
 *    >
 *  >
 * >
 */

export default new View(
  RadioKitQueries,
  queries => queries
    .filter(result => (
      result.get('status') === QUERY_STATUS.live ||
      result.get('status') === QUERY_STATUS.done ||
      result.get('status') === QUERY_STATUS.loading
    ))
    .sortBy(query => query.get('time'))
    .groupBy((result, params) => params.get('app'))
    .map(
      queriesOfApp => queriesOfApp
        .groupBy((result, params) => params.get('model'))
        .map(
          queriesOfModel => queriesOfModel
            .map(
              (result, params) => result
                .get('data', List())
                .map(item => Map({ item, action: params.get('action') }))
                .toList()
            )
            .toList()
            .flatten(true)
            .groupBy(itemWithAction => itemWithAction.getIn(['item', 'id']))
            .map(
              itemsWithAction => {
                const isDeleted = !!itemsWithAction.find(
                  itemWithAction => itemWithAction.get('action') === 'destroy'
                );
                if (isDeleted) {
                  return null;
                }
                return itemsWithAction.last().get('item');
              }
            )
            .filter(item => !!item)
        )
    )
);
