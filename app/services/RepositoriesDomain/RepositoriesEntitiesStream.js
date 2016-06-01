import {
  Map,
} from 'immutable';
import {
  app,
  model,
} from './RepositoriesConfig';
import RadioKitDomain from '../RadioKitDomain';

const RepositoriesEntitiesStream = RadioKitDomain.map(
  data => data.getIn(['entities', app, model], Map())
);

export default RepositoriesEntitiesStream;
