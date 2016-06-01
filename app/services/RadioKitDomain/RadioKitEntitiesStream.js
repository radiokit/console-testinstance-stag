import {
  View,
} from 'immview';
import {
  Map,
} from 'immutable';
import {
  groupBy,
  mapValues,
  find,
  last,
} from 'lodash';
import { RadioKitQueriesStream } from './RadioKitQueriesStream';
import * as STATUS from './RadioKitQueryStatuses';

function compareQueries(a, b) {
  return (a[1].time | 0) - ((b[1].time || Number.MAX_VALUE) | 0);
}

function getEntities(queries) {
  const entitiesOfStatus = {
    [STATUS.done]: [],
    [STATUS.live]: [],
    [STATUS.loading]: [],
  };

  queries.forEach((queryInfo, queryParams) => {
    queryInfo.get('data', []).forEach((entity) => {
      entitiesOfStatus[queryInfo.get('status')].push([
        queryParams,
        {
          status: queryInfo.get('status'),
          time: queryInfo.get('time', 0),
          entity,
        },
      ]);
    });
  });

  const timeSortedEntitiesOfStatus = {
    [STATUS.done]: entitiesOfStatus[STATUS.done].sort(compareQueries),
    [STATUS.live]: entitiesOfStatus[STATUS.live].sort(compareQueries),
    [STATUS.loading]: entitiesOfStatus[STATUS.loading].sort(compareQueries),
  };

  const timeSortedEntities =
    timeSortedEntitiesOfStatus[STATUS.done]
      .concat(timeSortedEntitiesOfStatus[STATUS.live])
      .concat(timeSortedEntitiesOfStatus[STATUS.loading]);

  const indexedEntities = mapValues(
    groupBy(timeSortedEntities, ([queryParams]) => queryParams.get('app')),
    appGroup => mapValues(
      groupBy(
        appGroup,
        ([queryParams]) => queryParams.get('model')
      ),
      modelGroup => mapValues(
        groupBy(
          modelGroup,
          ([, { entity }]) => entity.get('id')
        ),
        idGroup => {
          const isDeleted = !!find(
            idGroup,
            ([queryParams]) => queryParams.get('action') === 'destroy'
          );
          if (isDeleted) {
            return null;
          }
          return last(idGroup)[1].entity || null;
        }
      )
    )
  );

  return Map(mapValues(
    indexedEntities,
    apps => Map(mapValues(
      apps,
      models => Map(mapValues(
        models,
        ids => Map(ids)
      ))
    ))
  ));
}

export default new View(
  RadioKitQueriesStream,
  queries => Map({
    entities: getEntities(queries),
    queries,
  })
);
