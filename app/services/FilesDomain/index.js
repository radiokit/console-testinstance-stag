import {
  Domain,
} from 'immview';

import stream from './FilesDomainStream';
import actions from './FilesDomainActions';

export default new Domain(stream, actions);
