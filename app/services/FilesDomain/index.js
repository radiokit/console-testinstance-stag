import {
  Domain,
} from 'immview';

import FilesDomainStream from './FilesDomainStream';
import * as FilesDomainInterface from './FilesDomainInterface';

export default new Domain(
  FilesDomainStream,
  FilesDomainInterface
);
