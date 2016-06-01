import {
  Domain,
} from 'immview';
import stream from './MetadataSchemasDomainStream';
import actions from './MetadataSchemasDomainActions';

export default new Domain(stream, actions);
