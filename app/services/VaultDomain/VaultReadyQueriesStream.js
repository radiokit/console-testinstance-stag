import RadioKitDomain from '../RadioKitDomain';
import VaultQueriesStream from './VaultQueriesStream';

const { live, done } = RadioKitDomain.STATUS;

const VaultReadyQueriesStream = VaultQueriesStream.map(
  queries => queries.filter(
    result => (
      result.get('status') === live ||
      result.get('status') === done
    )
  )
);

export default VaultReadyQueriesStream;
