import {
  View,
} from 'immview';
import {
  searchKey,
  searchPhraseKey,
} from './FilesConfig';
import {
  indexWith,
} from '../RadioKitQueriesUtils';
import FilesReadyQueriesStream from './FilesReadyQueriesStream.js';
import FilesExpandedEntitiesStream from './FilesExpandedEntitiesStream';

const SearchStream = FilesReadyQueriesStream
  .map(queries => queries.filter((_, params) => params.get(searchKey)))
  .map(indexWith((_, params) => params.get(searchPhraseKey)))
  .map(searchQueriesByPhrase => searchQueriesByPhrase.map(
    searchQueryOfPhrase => searchQueryOfPhrase.get('data')
  ))
  ;

const FilesSearchQueriesStream = new View({
  queries: SearchStream,
  entities: FilesExpandedEntitiesStream,
}, data => {
  const { queries, entities } = data.toObject();
  return queries.map(
    files => files
      .map(file => entities.get(file.get('id')))
      .filter(v => !!v)
  );
});

export default FilesSearchQueriesStream;
