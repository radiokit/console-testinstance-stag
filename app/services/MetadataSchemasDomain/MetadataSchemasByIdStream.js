import {
  Map,
} from 'immutable';

import {
  app,
  model,
} from './MetadataSchemasConfig';

import RadioKitDomain from '../RadioKitDomain';

const MetadataSchemasByIdStream = RadioKitDomain.map(
  RadioKitData => RadioKitData.getIn(['entities', app, model]) || Map()
);

export default MetadataSchemasByIdStream;
