import {
  Map,
} from 'immutable';
import {
  app,
  model,
} from './RepositoriesConfig';
import RadioKitDomain from '../RadioKitDomain';

export default RadioKitDomain.map(
  data => data.getIn(['entities', app, model], Map())
);
