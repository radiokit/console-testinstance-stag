import {
  fromJS,
} from 'immutable';
import RadioKitDomain from '../RadioKitDomain';
import {
  app,
  key,
  model,
  readFields,
} from './MetadataSchemasConfig';

export function loadMetadataSchema(id, options) {
  RadioKitDomain.query(
    fromJS({
      key,
      app,
      model,
      select: readFields,
      conditions: [
        {
          field: 'id',
          comparison: 'eq',
          value: id,
        },
      ],
    }),
    {
      maxAge: 1000,
      ...options,
    }
  );
}
