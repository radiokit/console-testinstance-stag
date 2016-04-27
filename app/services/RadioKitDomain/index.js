import {
  Domain,
} from 'immview';
import * as Immutable from 'immutable';

import RadioKitDomainData from './RadioKitDomainData';
import * as RadioKitDomainInterface from './RadioKitDomainInterface';

const RadioKitDomain = new Domain(
  RadioKitDomainData,
  RadioKitDomainInterface,
);

// window.RadioKitDomain = RadioKitDomain;
// window.Immutable = Immutable;

export default RadioKitDomain;
