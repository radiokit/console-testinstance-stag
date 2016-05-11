import {
  Domain,
} from 'immview';

import RadioKitDomainStream from './RadioKitDomainStream';
import * as RadioKitDomainInterface from './RadioKitDomainInterface';
import * as STATUS from './RadioKitQueryStatuses';

const RadioKitDomain = new Domain(
  RadioKitDomainStream,
  RadioKitDomainInterface,
);

RadioKitDomain.STATUS = STATUS;

export default RadioKitDomain;
