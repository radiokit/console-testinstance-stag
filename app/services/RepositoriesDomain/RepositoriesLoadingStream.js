import {
  Map,
} from 'immutable';
import RepositoriesLoadingQueriesStream from './RepositoriesLoadingQueriesStream';

const loadingState = Map({ value: true });
const idleState = Map({ value: false });

const RepositoriesLoadingStream = RepositoriesLoadingQueriesStream.map(
  queries => (!!queries.count() ? loadingState : idleState)
);

export default RepositoriesLoadingStream;
