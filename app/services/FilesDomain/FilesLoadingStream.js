import {
  Map,
} from 'immutable';
import {
  View,
} from 'immview';
import {
  pickLoadingQueries,
} from '../RadioKitQueriesUtils';
import FilesQueriesStream from './FilesQueriesStream';
import MetadataItemsDomain from '../MetadataItemsDomain';

const FilesLoadingStream = FilesQueriesStream
  .map(pickLoadingQueries)
  .map(queries => Map({ value: !!queries.count() }))
  ;

const MetadataItemsLoadingStream = MetadataItemsDomain.map(
  data => Map({ value: data.get('loading') })
);

const loadingStream = new View(
  {
    FilesLoadingStream,
    MetadataItemsLoadingStream,
  },
  data => Map({
    value: (
      data.getIn(['FilesLoadingStream', 'value']) ||
      data.getIn(['MetadataItemsLoadingStream', 'value'])
    ),
  })
);

export default loadingStream;
