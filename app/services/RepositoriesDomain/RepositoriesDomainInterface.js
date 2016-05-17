import {
  fromJS,
} from 'immutable';
import RadioKitDomain from '../RadioKitDomain';
import {
  app,
  model,
  key,
  readFields,
} from './RepositoriesConfig';

export function loadRepository(id, requestOptions) {
  RadioKitDomain.load(app, model, id, readFields, { [key]: true }, requestOptions);
}

export function searchFiles(query, requestOptions) {
  RadioKitDomain.query(
    fromJS({
      [key]: true,
      app,
      model,
      select: readFields,
      // TODO query
    }),
    requestOptions
  );
}
