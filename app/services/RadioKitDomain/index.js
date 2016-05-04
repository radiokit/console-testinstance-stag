import {
  Domain,
} from 'immview';

import RadioKitDomainData from './RadioKitDomainData';
import * as RadioKitDomainInterface from './RadioKitDomainInterface';
import * as STATUS from './RadioKitQueryStatuses';

const RadioKitDomain = new Domain(
  RadioKitDomainData,
  RadioKitDomainInterface,
);

RadioKitDomain.STATUS = STATUS;

export default RadioKitDomain;
