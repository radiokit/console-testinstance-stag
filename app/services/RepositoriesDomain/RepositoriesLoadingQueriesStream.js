import RepositoriesQueriesStream from './RepositoriesQueriesStream';
import {
  pickLoadingQueries,
} from '../RadioKitQueriesUtils';

export default RepositoriesQueriesStream.map(pickLoadingQueries);
