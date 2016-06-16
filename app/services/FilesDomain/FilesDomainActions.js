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
  joins,
} from './FilesConfig';

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

  loadRecentFiles(limit = 25, userAccountID = null, options = {}) {
    runFilesQuery(
      {
        conditions: [
          {
            field: 'stage',
            comparison: 'eq',
            value: 'current',
          },
          userAccountID ? {
            field: 'record_repository.references',
            comparison: 'deq',
            value: `user_account_id ${userAccountID}`,
          } : null,
        ],
        order: {
          field: 'updated_at',
          direction: 'desc',
        },
        limit,
        offset: 0,
      },
      options
    );
  },

  searchFiles(query = '', userAccountID = null, stage = 'current', options = {}) {
    runFilesQuery(
      {
        conditions: [
          {
            field: 'stage',
            comparison: 'eq',
            value: stage,
          },
          {
            field: 'name',
            comparison: 'ilike',
            value: ['%'].concat(query.split('').map(letter => `${letter}%`)).join(''),
          },
          userAccountID ? {
            field: 'record_repository.references',
            comparison: 'deq',
            value: `user_account_id ${userAccountID}`,
          } : null,
        ],
        [searchKey]: true,
        [searchPhraseKey]: query,
        offset: 0,
        limit: 10,
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function runFilesQuery(queryAppendix = {}, requestOptions) {
  RadioKitDomain.query(
    fromJS({
      [key]: true,
      app,
      model,
      select: readFields,
      joins,
      ...queryAppendix,
    }),
    requestOptions
  );
}
