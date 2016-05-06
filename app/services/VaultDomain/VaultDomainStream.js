import {
  View,
} from 'immview';
import {
  Map,
} from 'immutable';

import VaultLoadingStream from './VaultLoadingStream';
import VaultFilesStream from './VaultFilesStream';

export default new View({
  files: VaultFilesStream,
  loading: VaultLoadingStream,
}, data => Map({
  files: data.get('files'),
  loading: data.getIn(['loading', 'value']),
}));
