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

const FilesIdsStream = FilesEntitiesStream.map(getUniqFileIds);

function getUniqFileIds(files) {
  return files.map(file => file.get('id')).toSet();
}

FilesIdsStream.subscribe(loadMetadataForFiles);

function loadMetadataForFiles(fileIds) {
  fileIds.forEach(loadMetadataForFile);
}

function loadMetadataForFile(fileId) {
  MetadataItemsDomain.loadMetadataItemOfFile(fileId, { noLoadingState: true });
}

const FilesExpandedEntitiesStream = new View(
  {
    metadataItems: MetadataItemsDomain,
    files: FilesEntitiesStream,
  },
  data => {
    const { metadataItems, files } = data.toObject();
    return rejectFilesWithoutMetadataItems(
      files.map(fillFileWithMetadata(metadataItems))
    );
  }
);

function rejectFilesWithoutMetadataItems(files) {
  return files.filter(
    file => !!file.get('metadata_items')
  );
}

function fillFileWithMetadata(metadataItems) {
  return function fillFileWithGivenMetadata(file) {
    const metadataItemsOfFile = getMetadataForFiles(metadataItems, file.get('id'));
    if (metadataItemsOfFile) {
      return file.set('metadata_items', metadataItemsOfFile);
    }
    return file;
  };
}

function getMetadataForFiles(metadataItems, fileId) {
  return metadataItems.getIn(['entities', fileId]);
}

export default FilesExpandedEntitiesStream;
