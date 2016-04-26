import {
  View,
} from 'immview';

import RadioKitDomain from '../RadioKitDomain';

import domainConfig from './VaultDomainConfig';

const vaultQueries = RadioKitDomain.map(
  RKDData => RKDData.filter((queryStatus, queryParams) => (
    queryParams.get('key') === domainConfig.key
  ))
);

const readyQueries = vaultQueries.map(
  queries => queries.filter((queryStatus) => (
    queryStatus.get('status') === 'live' ||
    queryStatus.get('status') === 'done'
  ))
);

const filesView = readyQueries.map(
  queries => queries
    .filter(
      (queryStatus, queryParams) => queryParams.get('model') === domainConfig.models.file
    )
    .map(queryStatus => queryStatus.get('data'))
    .flatten(true)
    .groupBy(file => file.get('id'))
    .map(fileVersions => fileVersions.last())
);

export default new View({
  files: filesView,
});
