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
}, data => Map({
  files: data.get('files'),
  // search: data.get('search'),
  loading: data.getIn(['loading', 'value']),
}));

export default FilesDomainStream;
