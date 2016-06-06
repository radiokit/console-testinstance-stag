import {
  Map,
} from 'immutable';
import {
  View,
} from 'immview';
import {
  pickLoadingQueries,
} from '../RadioKitQueriesUtils';
import FilesQueriesStream from './FilesQueriesStream';
import MetadataItemsDomain from '../MetadataItemsDomain';

const loadingState = Map({ value: true });
const idleState = Map({ value: false });

function getLoadStateDescriptor(condition) {
  return condition ? loadingState : idleState;
}

const FilesQueriesLoadingStream = FilesQueriesStream
  .map(pickLoadingQueries)
  .map(queries => getLoadStateDescriptor(queries.count() > 0))
  ;

const MetadataItemsLoadingStream = MetadataItemsDomain.map(
  MetadataItemsDomainState => getLoadStateDescriptor(MetadataItemsDomainState.get('loading', false))
);

const FilesLoadingStream = new View(
  {
    FilesQueriesLoadingStream,
    MetadataItemsLoadingStream,
  },
  data => (
    getLoadStateDescriptor(
      data.getIn(['FilesQueriesLoadingStream', 'value'], false) ||
      data.getIn(['MetadataItemsLoadingStream', 'value'], false)
    )
  )
);

export default FilesLoadingStream;
