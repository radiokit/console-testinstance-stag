import {
  Map,
} from 'immutable';
import {
  app,
  model,
} from './ContentTypesConfig';
import RadioKitDomain from '../RadioKitDomain';

const noEntities = Map();

const ContentTypesEntitiesStream = RadioKitDomain.map(
  function ContentTypesEntitiesProcess(data) {
    return data.getIn(['entities', app, model]) || noEntities;
  }
);

export default ContentTypesEntitiesStream;
