import {
  View,
} from 'immview';

import RadioKitDomain from '../RadioKitDomain';

import domainConfig from './VaultDomainConfig';

const vaultDomainOwnQueries = RadioKitDomain.map(
  RKDData => RKDData.filter((result, queryParams) => (
    queryParams.get('key') === domainConfig.key
  ))
);

const readyQueries = vaultDomainOwnQueries.map(
  queries => queries.filter(result => (
    result.get('status') === 'live' ||
    result.get('status') === 'done'
  ))
);

const filesQueries = readyQueries.map(
  queries => queries
    .filter(
      (queryStatus, queryParams) => queryParams.get('model') === domainConfig.models.file
    )
);

const filesById = filesQueries.map(
  queries => queries
    .map(queryStatus => queryStatus.get('data').toList())
    .toList()
    .flatten(true)
    .groupBy(file => file.get('id'))
    .map(fileVersions => fileVersions.last())
);

export default new View({
  files: filesById,
});
