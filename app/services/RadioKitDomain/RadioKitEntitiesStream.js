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
  concat,
} from 'lodash';
import { RadioKitQueriesStream } from './RadioKitQueriesStream';
import * as STATUS from './RadioKitQueryStatuses';

export default new View(
  RadioKitQueriesStream,
  queries => Map({
    entities: getLatestKnownEntities(queries),
    queries,
  })
);

function getLatestKnownEntities(queries) {
  const entitiesOfStatus = indexQueriesByStatus(queries);

  const timeSortedEntitiesOfStatus = mapValues(
    entitiesOfStatus,
    sortQueriesByTime
  );

  const timeSortedEntities = concat(
    [],
    timeSortedEntitiesOfStatus[STATUS.done],
    timeSortedEntitiesOfStatus[STATUS.live],
    timeSortedEntitiesOfStatus[STATUS.loading]
  );

  const indexedEntities = indexByAppModelID(timeSortedEntities);

  // more efficient fromJS equivalent on indexedEntities
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

function indexByAppModelID(timeSortedEntities) {
  return mapValues(
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
        flattenEntityOccurrences
      )
    )
  );
}

function indexQueriesByStatus(queries) {
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

  return entitiesOfStatus;
}

function sortQueriesByTime(queries) {
  return queries.sort(compareQueries);
}

function compareQueries(a, b) {
  return (a[1].time | 0) - ((b[1].time || Number.MAX_VALUE) | 0);
}

function flattenEntityOccurrences(entityOccurrences) {
  const isDeleted = !!find(
    entityOccurrences,
    ([queryParams]) => queryParams.get('action') === 'destroy'
  );
  if (isDeleted) {
    return null;
  }
  return last(entityOccurrences)[1].entity || null;
}
