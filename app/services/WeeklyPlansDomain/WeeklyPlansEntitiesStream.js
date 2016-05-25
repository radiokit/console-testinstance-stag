import {
  Map,
} from 'immutable';
import {
  app,
  model,
} from './WeeklyPlansConfig';
import RadioKitDomain from '../RadioKitDomain';

const noEntities = Map();

export default RadioKitDomain.map(
  function WeeklyPlansEntitiesProcess(data) {
    return data.getIn(['entities', app, model], noEntities);
  }
);
