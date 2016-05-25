import RadioKitDomain from '../RadioKitDomain';
import {
  key,
} from './FilesConfig';

const FilesQueriesStream = RadioKitDomain.map(
  data => data
    .get('queries')
    .filter((result, queryParams) => queryParams.get(key))
);

export default FilesQueriesStream;
