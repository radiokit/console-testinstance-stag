import {
  pickReadyQueries,
} from '../RadioKitQueriesUtils';
import FilesQueriesStream from './FilesQueriesStream';

const FilesReadyQueriesStream = FilesQueriesStream.map(pickReadyQueries);

export default FilesReadyQueriesStream;
