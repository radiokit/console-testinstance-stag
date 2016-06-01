import {
  fromJS,
} from 'immutable';
import RadioKitDomain from '../RadioKitDomain';
import {
  app,
  key,
  model,
  readFields,
  createFields,
  updateFields,
} from './MetadataItemsConfig';

const actions = {
  loadMetadataItemOfFile(fileId, options) {
    RadioKitDomain.query(
      fromJS({
        key,
        app,
        model,
        select: readFields,
        conditions: [
          {
            field: 'record_file_id',
            comparison: 'eq',
            value: fileId,
          },
        ],
      }),
      {
        maxAge: 60000,
        ...options,
      }
    );
  },

  saveMetadataItem(entity, id) {
    RadioKitDomain.save(
      fromJS({
        app,
        key,
        model,
        id,
      }),
      entity.filter((_, k) => (id ? updateFields : createFields).indexOf(k) >= 0)
    );
  },
};

export default actions;
