import RadioKitDomain from '../RadioKitDomain';
import {
  key,
} from './FilesConfig';

const FilesQueriesStream = RadioKitDomain.map(
  RKDData => RKDData.filter((result, queryParams) => (
    queryParams.get(key)
  ))
);

export default FilesQueriesStream;
