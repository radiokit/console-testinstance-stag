import {
  View,
} from 'immview';
import RadioKitEntitiesStream from './RadioKitEntitiesStream';

export default new View(
  RadioKitEntitiesStream,
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
            params.get('id') || entity.get('id'),
          ], null))
          .filter(entity => !!entity)
      )
    )
);
