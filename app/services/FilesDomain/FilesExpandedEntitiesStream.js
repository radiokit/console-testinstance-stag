import {
  View,
} from 'immview';
import {
  model,
} from './FilesConfig';
import FilesReadyQueriesStream from './FilesReadyQueriesStream';
import MetadataItemsDomain from '../MetadataItemsDomain';
import {
  pickQueriesOfModel,
  getEntitiesByIdFromQueries,
} from './../RadioKitQueriesUtils';

const FilesEntitiesStream = FilesReadyQueriesStream
  .map(pickQueriesOfModel(model))
  .map(getEntitiesByIdFromQueries);

const FilesIdsStream = FilesEntitiesStream.map(
  files => files
    .map(file => file.get('id'))
    .sort()
    .toSet()
);

FilesIdsStream.subscribe(
  fileIds => fileIds.forEach(
    fileId => MetadataItemsDomain.loadMetadataItemOfFile(fileId)
  )
);

const FilesExpandedEntitiesStream = new View(
  {
    metadatas: MetadataItemsDomain,
    files: FilesEntitiesStream,
  },
  data => {
    const { metadatas, files } = data.toObject();
    return files
      .map(
        file => {
          const metadatasForFile = metadatas.getIn(['entities', file.get('id')]);
          if (metadatasForFile) {
            return file.set('metadata_items', metadatasForFile);
          }
          return null;
        }
      )
      .filter(v => !!v)
    ;
  }
);

export default FilesExpandedEntitiesStream;
