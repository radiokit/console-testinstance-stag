import {
  Map,
} from 'immutable';
import {
  View,
} from 'immview';
import MetadataSchemasLoadingStream from './MetadataSchemasLoadingStream';
import MetadataSchemasByIdStream from './MetadataSchemasByIdStream';

const MetadataSchemasDomainStream = new View({
  entities: MetadataSchemasByIdStream,
  loading: MetadataSchemasLoadingStream,
}, data => Map({
  entities: data.get('entities'),
  loading: data.getIn(['loading', 'value']),
}));

export default MetadataSchemasDomainStream;
