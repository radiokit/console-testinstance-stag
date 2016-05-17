import {
  Map,
} from 'immutable';
import RepositoriesLoadingQueriesStream from './RepositoriesLoadingQueriesStream';

export default RepositoriesLoadingQueriesStream.map(
  queries => Map({ value: !!queries.count() })
);
