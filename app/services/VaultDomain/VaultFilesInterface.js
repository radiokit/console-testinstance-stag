import {
  fromJS,
  Map,
} from 'immutable';
import RadioKitDomain from '../RadioKitDomain';

import {
  app,
  key,
} from './VaultConfig';
import {
  model,
  readFields,
  updateFields,
} from './VaultFilesConfig';

import {
  loadMetadataItemOfFile,
  saveMetadataItem,
} from './VaultMetadataItemsInterface';

export function loadFile(id, options = {}) {
  const requestOptions = {
    maxAge: 1000,
    ...options,
  };

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
    requestOptions
  );
  loadMetadataItemOfFile(id, requestOptions);
}

export function saveFile(entity, id) {
  RadioKitDomain.save(
    fromJS({ app, key, model, id }),
    entity.filter((_, k) => updateFields.indexOf(k) >= 0)
  );
  entity.get('metadata_items', Map()).forEach(
    metadataItem => saveMetadataItem(metadataItem, metadataItem.get('id'))
  );
}

export function deleteFile(id) {

}

