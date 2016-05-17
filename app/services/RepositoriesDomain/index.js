import {
  Domain,
} from 'immview';

import RepositoriesDomainStream from './RepositoriesDomainStream';
import * as RepositoriesDomainInterface from './RepositoriesDomainInterface';

export default new Domain(
  RepositoriesDomainStream,
  RepositoriesDomainInterface
);
