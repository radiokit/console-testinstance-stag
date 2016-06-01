import {
  Domain,
} from 'immview';

import stream from './ScheduleDomainStream';
import actions from './ScheduleDomainActions';

const ScheduleDomain = new Domain(stream, actions);

export default ScheduleDomain;
