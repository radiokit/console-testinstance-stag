import {
  View,
} from 'immview';

import {
  Map,
  OrderedMap,
  List,
} from 'immutable';

import RadioKitDomain from '../RadioKitDomain';
import VaultDomain from '../VaultDomain';

const scheduleQueries = RadioKitDomain.map(
  RKDData => RKDData.filter((queryStatus, queryParams) => queryParams.get('key') === 'schedule')
);

const readyQueries = scheduleQueries.map(
  RKDData => RKDData.filter(
    (queryStatus) => (
      queryStatus.get('status') === 'live' ||
      queryStatus.get('status') === 'done'
    )
  )
);

const fileDataMaxAge = 60 * 1000; // 1min
readyQueries
  .map(queries => queries.map(
    status => status.get('data', List())
  ).flatten(true))
  .map(items => items.map(
    item => List(item.get('location').split('/')).last()).flatten(true).toSet()
  )
  .subscribe(fileIds => fileIds.forEach(fileID => {
    VaultDomain.loadFile(fileID, { maxAge: fileDataMaxAge });
  }));

const queriesWithFiles = new View(
  { queries: readyQueries, vault: VaultDomain },
  data => data.get('queries', List()).map(
    query => query.set('data', query.get('data', List())
      .map(item => {
        const fileID = List(item.get('location').split('/')).last();
        const file = data.getIn(['vault', 'files', fileID]);
        if (file) {
          return item.set('file', file);
        }
        return null;
      })
      .filter(item => !!item)
    )
  )
);

function getRangeFromParams(queryParams) {
  const conditions = queryParams.get('conditions', List());

  const fromCondition =
    conditions.find(condition => condition.get('field') === 'start_at') ||
    Map();

  const toCondition =
    conditions.find(condition => condition.get('field') === 'stop_at') ||
    Map();

  const from = fromCondition.get('value', 0);
  const to = toCondition.get('value', 0);

  return { from, to };
}

export default new View(
  queriesWithFiles,
  RKDData => {
    let rangesMap = OrderedMap();
    let idsMap = OrderedMap();
    RKDData.forEach((queryStatus, queryParams) => {
      const range = getRangeFromParams(queryParams);
      const data = queryStatus.get('data', List());
      rangesMap = rangesMap.set(Map(range), data);
      data.forEach(item => {
        idsMap = idsMap.set(item.get('id'), item);
      });
    });
    return Map({
      ranges: rangesMap,
      all: idsMap,
    });
  }
);
