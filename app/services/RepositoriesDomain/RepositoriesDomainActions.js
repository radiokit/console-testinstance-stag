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

const actions = {
  loadRepository,
  loadRepositories,
};

export default actions;

function loadRepository(id, requestOptions) {
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

function loadRepositories(requestOptions) {
  performQuery({}, requestOptions);
}

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
