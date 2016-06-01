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
  .map(queries => (!!queries.count() ? loadingState : idleState));

const LoadingMetadataSchemasStream = MetadataSchemasDomain
  .map(data => (data.get('loading') ? loadingState : idleState));

const MetadataItemsLoadingStream = new View(
  {
    LoadingOwnQueriesStream,
    LoadingMetadataSchemasStream,
  },
  data => (
    (
      data.getIn(['LoadingOwnQueriesStream', 'value']) ||
      data.getIn(['LoadingMetadataSchemasStream', 'value'])
    )
      ? loadingState
      : idleState
  )
);

export default MetadataItemsLoadingStream;
