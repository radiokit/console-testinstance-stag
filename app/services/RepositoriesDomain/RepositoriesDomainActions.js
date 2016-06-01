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

const actions = {
  loadRepository(id, requestOptions) {
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
  },

  loadRepositories(requestOptions) {
    performQuery({}, requestOptions);
  },
};

export default actions;
