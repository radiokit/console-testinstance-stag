import {
  Domain,
} from 'immview';

import RadioKitDomainData from './RadioKitDomainData';
import * as RadioKitDomainInterface from './RadioKitDomainInterface';

const RadioKitDomain = new Domain(
  RadioKitDomainData,
  RadioKitDomainInterface,
);

export default RadioKitDomain;
