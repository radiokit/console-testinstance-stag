import {
  Map,
} from 'immutable';
import {
  View,
} from 'immview';
import RadioKitEntitiesStream from './RadioKitEntitiesStream';

function refreshQueries(queries, entities) {
  return queries.map(
    (status, params) => status.set(
      'data',
      status.get('data')
        .map(entity => entities.getIn([
          params.get('app'),
          params.get('model'),
          params.get('id') || entity.get('id'),
        ], null))
        .filter(entity => !!entity)
    )
  );
}

const emptyEntities = Map();
const emptyQueries = Map();

export default new View(
  RadioKitEntitiesStream,
  data => {
    const entities = data.get('entities', emptyEntities);
    const queries = data.get('queries', emptyQueries);
    return Map({
      queries: refreshQueries(queries, entities),
      entities,
    });
  });
