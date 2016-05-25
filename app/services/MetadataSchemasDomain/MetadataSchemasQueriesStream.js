import {
  key,
} from './MetadataSchemasConfig';
import RadioKitDomain from '../RadioKitDomain';

const MetadataSchemasQueriesStream = RadioKitDomain.map(
  data => data
    .get('queries')
    .filter(
      (_, params) => params.get('key') === key
    )
);

export default MetadataSchemasQueriesStream;
