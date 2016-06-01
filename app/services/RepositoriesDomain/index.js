import {
  Domain,
} from 'immview';

import stream from './RepositoriesDomainStream';
import actions from './RepositoriesDomainActions';

const RepositoriesDomain = new Domain(stream, actions);

export default RepositoriesDomain;
