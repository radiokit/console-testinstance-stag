import {
  View,
} from 'immview';
import {
  Map,
} from 'immutable';

import FilesLoadingStream from './FilesLoadingStream';
// import FilesSearchQueriesStream from './FilesSearchQueriesStream';
import FilesExpandedEntitiesStream from './FilesExpandedEntitiesStream';

const FilesDomainStream = new View({
  files: FilesExpandedEntitiesStream,
  // search: FilesSearchQueriesStream,
  loading: FilesLoadingStream,
}, data => {
  const { files, loading } = data.toObject();
  
  return Map({
    files,
    loading: loading.get('value', false),
  });
});

export default FilesDomainStream;
