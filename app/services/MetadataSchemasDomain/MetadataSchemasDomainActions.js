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

const actions = {
  loadMetadataSchema,
};

export default actions;

function loadMetadataSchema(id, options) {
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
      maxAge: 60000,
      ...options,
    }
  );
}
