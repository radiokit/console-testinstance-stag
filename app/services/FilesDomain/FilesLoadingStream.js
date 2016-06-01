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

const FilesQueriesLoadingStream = FilesQueriesStream
  .map(pickLoadingQueries)
  .map(queries => ((!!queries.count()) ? loadingState : idleState))
  ;

const MetadataItemsLoadingStream = MetadataItemsDomain.map(
  data => (data.get('loading') ? loadingState : idleState)
);

const FilesLoadingStream = new View(
  {
    FilesQueriesLoadingStream,
    MetadataItemsLoadingStream,
  },
  data => (
    (
      data.getIn(['FilesQueriesLoadingStream', 'value']) ||
      data.getIn(['MetadataItemsLoadingStream', 'value'])
    )
      ? loadingState
      : idleState
  )
);

export default FilesLoadingStream;
