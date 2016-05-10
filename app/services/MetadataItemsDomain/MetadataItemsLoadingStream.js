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

const LoadingOwnQueriesStream = MetadataItemsQueriesStream
  .map(pickLoadingQueries)
  .map(queries => Map({ value: !!queries.count() }));

const LoadingMetadataSchemasStream = MetadataSchemasDomain
  .map(data => Map({ value: data.get('loading') }));

const MetadataItemsLoadingStream = new View(
  {
    LoadingOwnQueriesStream,
    LoadingMetadataSchemasStream,
  },
  data => Map({
    value: (
      data.getIn(['LoadingOwnQueriesStream', 'value']) ||
      data.getIn(['LoadingMetadataSchemasStream', 'value'])
    ),
  })
);

export default MetadataItemsLoadingStream;
