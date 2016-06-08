import {
  View,
} from 'immview';
import {
  getQueryData,
  pickReadyQueries,
} from '../RadioKitQueriesUtils';

import MetadataItemsQueriesStream from './MetadataItemsQueriesStream';

import MetadataItemsEntitiesExtendedStream from './MetadataItemsEntitiesExtendedStream';

/**
 * This stream will push only metadatas of files
 * that has completed queries.
 * However metadataItems bound to those queries scattered across different queries
 * and it is like this because of possible create requests of metadatas
 * that otherwise would not be assigned to file
 */

const MetadataItemsReadyQueriesStream = MetadataItemsQueriesStream.map(pickReadyQueries);

const MetadataItemsByFileStream = new View(
  {
    extendedMetadataItemsByFileId: MetadataItemsEntitiesExtendedStream,
    readyQueries: MetadataItemsReadyQueriesStream,
  },
  data => {
    const { extendedMetadataItemsByFileId, readyQueries } = data.toObject();

    const readyQueriesData = readyQueries.map(getQueryData);
    const readyQueriesByFile = readyQueriesData.groupBy(
      (_, queryParams) => getFileIdFromQueryParams(queryParams)
    );
    const lastQueriesByFile = readyQueriesByFile.map(getLatestQuery);
    const extendedMetadataItemsByFile = lastQueriesByFile.map(
      (queryResponse, fileId) =>
        extendedMetadataItemsByFileId.get(fileId) || queryResponse
    );

    return getNonEmptyValues(extendedMetadataItemsByFile);
  }
);

export default MetadataItemsByFileStream;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function getLatestQuery(queries) {
  return queries.last();
}

function getFileIdFromQueryParams(queryParams) {
  return queryParams
    .get('conditions')
    .find(i => i.get('field') === 'record_file_id')
    .get('value');
}

function getNonEmptyValues(collection) {
  return collection.filter(v => !!v);
}
