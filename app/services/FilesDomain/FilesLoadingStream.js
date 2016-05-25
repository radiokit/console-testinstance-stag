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

const FilesLoadingStream = FilesQueriesStream
  .map(pickLoadingQueries)
  .map(queries => ((!!queries.count()) ? loadingState : idleState))
  ;

const MetadataItemsLoadingStream = MetadataItemsDomain.map(
  data => (data.get('loading') ? loadingState : idleState)
);

const loadingStream = new View(
  {
    FilesLoadingStream,
    MetadataItemsLoadingStream,
  },
  data => Map({
    value: (
      data.getIn(['FilesLoadingStream', 'value']) ||
      data.getIn(['MetadataItemsLoadingStream', 'value'])
    ),
  })
);

export default loadingStream;
