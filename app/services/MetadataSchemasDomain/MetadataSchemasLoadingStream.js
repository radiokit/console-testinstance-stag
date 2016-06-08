import {
  Map,
} from 'immutable';
import {
  pickLoadingQueries,
} from '../RadioKitQueriesUtils';

const loadingState = Map({ value: true });
const idleState = Map({ value: false });

import MetadataSchemasQueriesStream from './MetadataSchemasQueriesStream';

const LoadingQueriesStream = MetadataSchemasQueriesStream.map(pickLoadingQueries);

const MetadataSchemasLoadingStream = LoadingQueriesStream
  .map(queries => (!!queries.count() ? loadingState : idleState));

export default MetadataSchemasLoadingStream;
