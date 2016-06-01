import {
  View,
} from 'immview';
import {
  List,
} from 'immutable';
import {
  pickReadyQueries,
} from '../RadioKitQueriesUtils';

import MetadataItemsQueriesStream from './MetadataItemsQueriesStream';

import ExtendedMetadataItemsByFileIdStream from './ExtendedMetadataItemsByFileIdStream';

/**
 * This stream will push only metadatas of files
 * that has completed queries.
 * However metadataItems bound to those queries scattered across different queries
 * and it is like this because of possible create requests of metadatas
 * that otherwise would not be assigned to file
 */

const ReadyQueriesStream = MetadataItemsQueriesStream.map(pickReadyQueries);

const MetadataItemsByFileStream = new View(
  {
    extendedMetadataItemsByFileId: ExtendedMetadataItemsByFileIdStream,
    readyQueries: ReadyQueriesStream,
  },
  data => {
    const { extendedMetadataItemsByFileId, readyQueries } = data.toObject();

    return readyQueries
      .groupBy(
        (_, queryParams) => queryParams
          .get('conditions')
          .find(i => i.get('field') === 'record_file_id')
          .get('value')
      )
      .map((queries, fileId) => {
        const extendedMetadataItemsOfFile = extendedMetadataItemsByFileId.get(fileId);
        if (extendedMetadataItemsOfFile) {
          return extendedMetadataItemsOfFile;
        }

        const lastQueryData = queries.last().get('data');
        if (lastQueryData.count() === 0) {
          return List();
        }

        return null;
      })
      .filter(v => !!v)
    ;
  }
);

export default MetadataItemsByFileStream;
