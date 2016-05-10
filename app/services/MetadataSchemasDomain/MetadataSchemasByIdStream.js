import {
  model,
} from './MetadataSchemasConfig';
import {
  pickReadyQueries,
  pickQueriesOfModel,
  getEntitiesByIdFromQueries,
} from '../RadioKitQueriesUtils';

import MetadataItemsQueriesStream from './MetadataSchemasQueriesStream';

const ReadyQueriesStream = MetadataItemsQueriesStream.map(pickReadyQueries);

const MetadataSchemasQueriesStream = ReadyQueriesStream.map(pickQueriesOfModel(model));

const MetadataSchemasByIdStream = MetadataSchemasQueriesStream.map(getEntitiesByIdFromQueries);

export default MetadataSchemasByIdStream;
