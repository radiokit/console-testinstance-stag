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

function runFilesQuery(queryAppendix = {}, requestOptions) {
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

const actions = {
  loadFile(id, requestOptions) {
    if (!id) {
      throw new Error(`${key}.loadFile Provide id`);
    }

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
      requestOptions
    );
  },

  loadFiles(options = {}) {
    runFilesQuery(
      {},
      options
    );
  },

  searchFiles(query, options = {}) {
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
  },

  saveFile(entity, id) {
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
  },
};

export default actions;
