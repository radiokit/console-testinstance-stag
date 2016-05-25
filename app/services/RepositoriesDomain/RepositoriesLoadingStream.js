import {
  Map,
} from 'immutable';
import RepositoriesLoadingQueriesStream from './RepositoriesLoadingQueriesStream';

const loadingState = Map({ value: true });
const idleState = Map({ value: false });

export default RepositoriesLoadingQueriesStream.map(
  queries => ((!!queries.count()) ? loadingState : idleState)
);
