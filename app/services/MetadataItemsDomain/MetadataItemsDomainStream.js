import {
  Map,
} from 'immutable';
import {
  View,
} from 'immview';
import MetadataItemsLoadingStream from './MetadataItemsLoadingStream';
import MetadataItemsByFileStream from './MetadataItemsByFileStream';

const MetadataItemsDomainStream = new View({
  entities: MetadataItemsByFileStream,
  loading: MetadataItemsLoadingStream,
}, data => Map({
  entities: data.get('entities'),
  loading: data.getIn(['loading', 'value']),
}));

export default MetadataItemsDomainStream;
