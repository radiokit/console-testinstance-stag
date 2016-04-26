import {
  Domain,
} from 'immview';

import ScheduleDomainData from './ScheduleDomainData';
import * as ScheduleDomainInterface from './ScheduleDomainInterface';

const ScheduleDomain = new Domain(
  ScheduleDomainData,
  ScheduleDomainInterface
);

window.schedule = ScheduleDomain;

export default ScheduleDomain;
