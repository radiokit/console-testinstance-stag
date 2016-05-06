import {
  List,
} from 'immutable';
import {
  View,
} from 'immview';
import {
  model,
} from './VaultMetadataItemsConfig';
import VaultQueriesStream from './VaultQueriesStream';
import VaultReadyQueriesStream from './VaultReadyQueriesStream';

function pickMetadataQueries(queries) {
  return queries.filter(
    (_, queryParams) => queryParams.get('model') === model
  );
}

const MetadataItemQueriesStream = VaultQueriesStream.map(pickMetadataQueries);
const MetadataItemReadyQueriesStream = VaultReadyQueriesStream.map(pickMetadataQueries);

/**
 * This stream will push only metadatas of files
 * that has completed queries.
 * However entities bound to those queries scattered across different queries
 * and it is like this because of possible create requests of metadatas
 * that otherwise would not be assigned to file
 */

const MetadataByFileId = new View(
  {
    queries: MetadataItemQueriesStream,
    readyQueries: MetadataItemReadyQueriesStream,
  },
  data => {
    const { queries, readyQueries } = data.toObject();
    const metadataByFile = queries
      .map(query => query.get('data').toList())
      .toList()
      .flatten(true)
      .groupBy(metadataItem => metadataItem.get('record_file_id'))
      .map(
          metadatasOfFileId => metadatasOfFileId
            .groupBy(metadata => metadata.get('id'))
            .map(
              metadatasById => metadatasById
                .map(metadataOfId => metadataOfId.last())
            )
      );
    return readyQueries
      .groupBy(
        (_, queryParams) => queryParams
          .get('conditions')
          .find(i => i.get('field') === 'record_file_id')
          .get('value')
      )
      .map((_, fileId) => metadataByFile.get(fileId, List()));
  }
);

export default MetadataByFileId;
