import {
  Domain,
} from 'immview';
import stream from './MetadataItemsDomainStream';
import actions from './MetadataItemsDomainActions';

export default new Domain(stream, actions);
