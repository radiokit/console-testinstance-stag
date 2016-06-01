import {
  Domain,
} from 'immview';

import stream from './RadioKitDomainStream';
import actions from './RadioKitDomainActions';
import * as STATUS from './RadioKitQueryStatuses';

const RadioKitDomain = new Domain(stream, actions);

RadioKitDomain.STATUS = STATUS;

export default RadioKitDomain;
