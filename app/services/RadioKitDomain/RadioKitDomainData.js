import {
  View,
} from 'immview';
import RadioKitQueries from './RadioKitQueries';
import RadioKitEntities from './RadioKitEntities';

export default new View(
  {
    queries: RadioKitQueries,
    entities: RadioKitEntities,
  },
  data => data
    .get('queries')
    .map(
      (status, params) => status.set(
        'data',
        status.get('data')
          .map(entity => data.getIn([
            'entities',
            params.get('app'),
            params.get('model'),
            entity.get('id'),
          ], null))
          .filter(entity => !!entity)
      )
    )
    .sortBy(
      (status) => status.get('time', Number.MAX_VALUE)
    )
);
