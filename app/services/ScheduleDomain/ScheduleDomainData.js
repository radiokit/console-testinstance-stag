import {
  View,
} from 'immview';

import {
  Map,
  OrderedMap,
  List,
} from 'immutable';

import RadioKitDomain from './../RadioKitDomain';

const scheduleReadyQueries = new View(
  RadioKitDomain.view,
  RKDData => RKDData.filter((queryStatus, queryParams) => (
    queryParams.get('key') === 'schedule') &&
    (
      queryStatus.get('status') === 'live' ||
      queryStatus.get('status') === 'done'
    )
  )
);

export default new View(
  scheduleReadyQueries,
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

function getRangeFromParams(queryParams) {
  const conditions = queryParams.get('conditions', List());
  const fromCondition = conditions.find(condition => condition.get('field') === 'start_at') || Map();
  const toCondition = conditions.find(condition => condition.get('field') === 'stop_at') || Map();
  const from = fromCondition.get('value', 0);
  const to = toCondition.get('value', 0);
  return {from, to};
}
