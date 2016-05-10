import {
  key,
} from './MetadataSchemasConfig';
import RadioKitDomain from '../RadioKitDomain';

const MetadataSchemasQueriesStream = RadioKitDomain.map(queries => queries.filter(
  (_, params) => params.get('key') === key
));

export default MetadataSchemasQueriesStream;
