import RadioKitDomain from '../RadioKitDomain';
import {
  key,
} from './RepositoriesConfig';

const RepositoriesQueriesStream = RadioKitDomain.map(
  queries => queries
    .get('queries')
    .filter(
      (_, params) => params.get(key)
    )
);

export default RepositoriesQueriesStream;
