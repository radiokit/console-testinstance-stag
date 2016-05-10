import {
  key,
} from './MetadataItemsConfig';
import RadioKitDomain from '../RadioKitDomain';

const MetadataItemsQueriesStream = RadioKitDomain.map(queries => queries.filter(
  (_, params) => params.get('key') === key
));

export default MetadataItemsQueriesStream;
