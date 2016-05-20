import RadioKitDomain from '../RadioKitDomain';
import {
  key,
} from './RepositoriesConfig';

export default RadioKitDomain.map(
  queries => queries.filter(
    (_, params) => params.get(key)
  )
);
