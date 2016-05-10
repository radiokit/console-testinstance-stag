import {
  Map,
} from 'immutable';
import {
  View,
  Domain,
} from 'immview';
import MetadataSchemasLoadingStream from './MetadataSchemasLoadingStream';
import MetadataSchemasByIdStream from './MetadataSchemasByIdStream';
import * as MetadataSchemasInterface from './MetadataSchemasInterface';

export default new Domain(
  new View({
    entities: MetadataSchemasByIdStream,
    loading: MetadataSchemasLoadingStream,
  }, data => Map({
    entities: data.get('entities'),
    loading: data.getIn(['loading', 'value']),
  })),
  MetadataSchemasInterface
);
