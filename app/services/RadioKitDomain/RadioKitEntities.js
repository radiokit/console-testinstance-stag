import {
  View,
} from 'immview';
import {
  OrderedMap,
  Map,
  List,
} from 'immutable';
import { RadioKitQueries } from './RadioKitQueries';
import * as STATUS from './RadioKitQueryStatuses';

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

function getQueriesByStatus(queries, status) {
  return queries
    .filter(result => (
      result.get('status') === status
    ));
}

function sortQueriesByTime(queries) {
  return queries
    .sortBy(query => query.get('time'));
}

export default new View(
  RadioKitQueries,
  queries => OrderedMap()
    .concat(sortQueriesByTime(getQueriesByStatus(queries, STATUS.done)))
    .concat(sortQueriesByTime(getQueriesByStatus(queries, STATUS.live)))
    .concat(sortQueriesByTime(getQueriesByStatus(queries, STATUS.loading)))
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
