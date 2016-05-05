import {
  Domain,
} from 'immview';

import data from './VaultDomainData';
import * as iface from './VaultDomainInterface';

export default new Domain(
  data,
  iface
);
