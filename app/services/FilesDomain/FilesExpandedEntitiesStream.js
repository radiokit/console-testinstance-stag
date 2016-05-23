import {
  View,
} from 'immview';
import {
  Map,
} from 'immutable';
import {
  app,
  model,
} from './FilesConfig';
import RadioKitDomain from '../RadioKitDomain';
import MetadataItemsDomain from '../MetadataItemsDomain';

const FilesEntitiesStream = RadioKitDomain.map(
  data => data.getIn(['entities', app, model], Map())
);

const FilesIdsStream = FilesEntitiesStream.map(
  files => files
    .map(file => file.get('id'))
    .toSet()
);

const requestQueueExecution = queue => {
  (window.requestIdleCallback || window.setTimeout)(
    () => {
      if (queue.count() === 0) {
        return;
      }
      const head = queue.first();
      const tail = queue.rest();
      head();
      requestQueueExecution(tail);
    }
  );
};

FilesIdsStream.subscribe(
  fileIds => {
    requestQueueExecution(
      fileIds.map(
        fileId => () => MetadataItemsDomain.loadMetadataItemOfFile(fileId, { noLoadingState: true })
      )
    );
  }
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
