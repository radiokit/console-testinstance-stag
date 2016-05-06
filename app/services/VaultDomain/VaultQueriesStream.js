import RadioKitDomain from '../RadioKitDomain';
import {
  key,
} from './VaultConfig';

const VaultQueriesStream = RadioKitDomain.map(
  RKDData => RKDData.filter((result, queryParams) => (
    queryParams.get('key') === key
  ))
);

export default VaultQueriesStream;
