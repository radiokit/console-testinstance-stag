import {
  List,
} from 'immutable';
import RepositoriesReadyQueriesStream from './RepositoriesReadyQueriesStream';
import {
  indexBy,
} from '../RadioKitQueriesUtils';

export default RepositoriesReadyQueriesStream.map(
  queries => queries
    .sortBy(query => query.get('time'))
    .map(query => query.get('data', List()))
    .map(indexBy('id'))
    .flatten(true)
);
