import {
  fromJS,
} from 'immutable';
import RadioKitDomain from '../RadioKitDomain';
import {
  app,
  model,
  key,
  readFields,
  readJoins,
} from './RepositoriesConfig';

function performQuery(queryAppendix, requestOptions) {
  RadioKitDomain.query(
    fromJS({
      [key]: true,
      app,
      model,
      select: readFields,
      joins: readJoins,
      ...queryAppendix,
    }),
    requestOptions
  );
}

export function loadRepository(id, requestOptions) {
  performQuery(
    {
      conditions: [
        {
          field: 'id',
          comparison: 'eq',
          value: id,
        },
      ],
    },
    requestOptions
  );
}

export function searchRepositories(query, requestOptions) {
  performQuery(
    {
      // TODO query
    },
    requestOptions
  );

}
