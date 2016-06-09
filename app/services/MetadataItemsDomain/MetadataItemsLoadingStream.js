import {
  Map,
} from 'immutable';
import {
  View,
} from 'immview';
import {
  pickLoadingQueries,
} from '../RadioKitQueriesUtils';

import MetadataItemsQueriesStream from './MetadataItemsQueriesStream';
import MetadataSchemasDomain from '../MetadataSchemasDomain';

const loadingState = Map({ value: true });
const idleState = Map({ value: false });

const LoadingOwnQueriesStream = MetadataItemsQueriesStream
  .map(pickLoadingQueries)
  .map(queries => getBoolState(queries.count()));

const LoadingMetadataSchemasStream = MetadataSchemasDomain
  .map(data => getBoolState(data.get('loading')));

const MetadataItemsLoadingStream = new View(
  {
    LoadingOwnQueriesStream,
    LoadingMetadataSchemasStream,
  },
  data => (
    getBoolState(
      data.getIn(['LoadingOwnQueriesStream', 'value']) ||
      data.getIn(['LoadingMetadataSchemasStream', 'value'])
    )
  )
);

export default MetadataItemsLoadingStream;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function getBoolState(condition) {
  return condition ? loadingState : idleState;
}
