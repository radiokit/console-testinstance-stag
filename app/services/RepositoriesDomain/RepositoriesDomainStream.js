import {
  Map,
} from 'immutable';
import {
  View,
} from 'immview';
import RepositoriesEntitiesStream from './RepositoriesEntitiesStream';
import RepositoriesLoadingStream from './RepositoriesLoadingStream';

export default new View({
  RepositoriesEntitiesStream,
  RepositoriesLoadingStream,
}, merged => Map({
  entities: merged.get('RepositoriesEntitiesStream'),
  loading: merged.getIn(['RepositoriesLoadingStream', 'value']),
}));
