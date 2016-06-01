import RepositoriesQueriesStream from './RepositoriesQueriesStream';
import {
  pickLoadingQueries,
} from '../RadioKitQueriesUtils';

const RepositoriesLoadingQueriesStream = RepositoriesQueriesStream.map(pickLoadingQueries);

export default RepositoriesLoadingQueriesStream;
