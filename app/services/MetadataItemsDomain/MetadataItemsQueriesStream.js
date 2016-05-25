import {
  key,
} from './MetadataItemsConfig';
import RadioKitDomain from '../RadioKitDomain';

const MetadataItemsQueriesStream = RadioKitDomain.map(
  data => data
    .get('queries')
    .filter(
      (_, params) => params.get('key') === key
    )
);

export default MetadataItemsQueriesStream;
