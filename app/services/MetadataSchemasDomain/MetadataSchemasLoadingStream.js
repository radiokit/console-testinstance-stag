import {
  Map,
} from 'immutable';
import {
  pickLoadingQueries,
} from '../RadioKitQueriesUtils';

import MetadataSchemasQueriesStream from './MetadataSchemasQueriesStream';

const LoadingQueriesStream = MetadataSchemasQueriesStream.map(pickLoadingQueries);

const LoadingStream = LoadingQueriesStream.map(queries => Map({ value: !!queries.count() }));

export default LoadingStream;
