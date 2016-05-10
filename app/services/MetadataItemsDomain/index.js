import {
  Map,
} from 'immutable';
import {
  View,
  Domain,
} from 'immview';
import MetadataItemsLoadingStream from './MetadataItemsLoadingStream';
import MetadataItemsByFileStream from './MetadataItemsByFileStream';
import * as MetadataItemsInterface from './MetadataItemsInterface';

export default new Domain(
  new View({
    entities: MetadataItemsByFileStream,
    loading: MetadataItemsLoadingStream,
  }, data => Map({
    entities: data.get('entities'),
    loading: data.getIn(['loading', 'value']),
  })),
  MetadataItemsInterface
);
