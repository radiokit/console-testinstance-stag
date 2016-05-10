import {
  fromJS,
  Map,
} from 'immutable';
import RadioKitDomain from '../RadioKitDomain';
import MetadataItemsDomain from '../MetadataItemsDomain';
import {
  app,
  key,
  searchKey,
  searchPhraseKey,
  model,
  readFields,
  updateFields,
} from './FilesConfig';

function runFilesQuery(queryAppendix = {}, options) {
  const requestOptions = {
    maxAge: 1000,
    ...options,
  };

  RadioKitDomain.query(
    fromJS({
      [key]: true,
      app,
      model,
      select: readFields,
      ...queryAppendix,
    }),
    requestOptions
  );
}

export function loadFile(id, options = {}) {
  runFilesQuery(
    {
      conditions: [
        {
          field: 'id',
          comparison: 'eq',
          value: id,
        },
      ],
    },
    options
  );
}

export function loadFiles(options = {}) {
  runFilesQuery(
    {},
    options
  );
}

export function searchFiles(query, options = {}) {
  runFilesQuery(
    {
      [searchKey]: true,
      [searchPhraseKey]: query,
      offset: 0,
      limit: 10,
      // TODO
    },
    options
  );
}

export function saveFile(entity, id) {
  RadioKitDomain.save(
    fromJS({
      [key]: true,
      app,
      model,
      id,
    }),
    entity.filter((_, k) => updateFields.indexOf(k) >= 0)
  );
  entity.get('metadata_items', Map()).forEach(
    metadataItem => MetadataItemsDomain.saveMetadataItem(metadataItem, metadataItem.get('id'))
  );
}

