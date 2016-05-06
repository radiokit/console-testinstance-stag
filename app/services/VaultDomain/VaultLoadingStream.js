import {
  Map,
} from 'immutable';

import RadioKitDomain from '../RadioKitDomain';
import VaultQueriesStream from './VaultQueriesStream';

const VaultLoadingStream = VaultQueriesStream.map(
  queries => Map({
    value: queries.filter(
      result => result.get('status') === RadioKitDomain.STATUS.loading
    ).count() > 0,
  })
);

export default VaultLoadingStream;
