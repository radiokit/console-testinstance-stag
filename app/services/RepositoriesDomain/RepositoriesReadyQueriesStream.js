import RepositoriesQueriesStream from './RepositoriesQueriesStream';
import {
  pickReadyQueries,
} from '../RadioKitQueriesUtils';

const RepositoriesReadyQueriesStream = RepositoriesQueriesStream.map(pickReadyQueries);

export default RepositoriesReadyQueriesStream;
