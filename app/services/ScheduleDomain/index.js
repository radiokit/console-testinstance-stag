import {
  Domain,
} from 'immview';

import ScheduleDomainStream from './ScheduleDomainStream';
import * as ScheduleDomainInterface from './ScheduleDomainInterface';

const ScheduleDomain = new Domain(
  ScheduleDomainStream,
  ScheduleDomainInterface
);

export default ScheduleDomain;
