import {
  View,
} from 'immview';
import {
  model,
} from './VaultFilesConfig';
import VaultReadyQueriesStream from './VaultReadyQueriesStream';
import VaultMetadataItemsByFileStream from './VaultMetadataItemsByFileStream';

const VaultReadyFileQueriesStream = VaultReadyQueriesStream
  .map(
    queries => queries
      .filter(
        (queryStatus, queryParams) => queryParams.get('model') === model
      )
  )
  .map(
    queries => queries
      .map(queryStatus => queryStatus.get('data').toList())
      .toList()
      .flatten(true)
      .groupBy(file => file.get('id'))
      .map(fileVersions => fileVersions.last())
  );

const VaultFilesStream = new View(
  {
    metadatas: VaultMetadataItemsByFileStream,
    files: VaultReadyFileQueriesStream,
  },
  data => {
    const { metadatas, files } = data.toObject();
    return files
      .map(
        file => {
          const metadatasForFile = metadatas.get(file.get('id'));
          if (metadatasForFile) {
            return file
              .set('metadata_items', metadatasForFile)
            ;
          }
          return null;
        }
      )
      .filter(v => !!v)
    ;
  }
);

export default VaultFilesStream;
