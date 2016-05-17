import RepositoriesQueriesStream from './RepositoriesQueriesStream';
import {
  pickReadyQueries,
} from '../RadioKitQueriesUtils';

export default RepositoriesQueriesStream.map(pickReadyQueries);
