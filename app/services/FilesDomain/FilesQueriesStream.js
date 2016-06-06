import RadioKitDomain from '../RadioKitDomain';
import {
  key,
} from './FilesConfig';

const FilesQueriesStream = RadioKitDomain.map(
  RadioKitDomainState => RadioKitDomainState
    .get('queries')
    .filter((result, queryParams) => queryParams.get(key))
);

export default FilesQueriesStream;
