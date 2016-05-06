import {
  Domain,
} from 'immview';

import VaultDomainStream from './VaultDomainStream';
import * as VaultDomainInterface from './VaultDomainInterface';

export default new Domain(
  VaultDomainStream,
  VaultDomainInterface
);
