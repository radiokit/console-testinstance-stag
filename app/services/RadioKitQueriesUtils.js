import {
  List,
} from 'immutable';
import RadioKitDomain from './RadioKitDomain';

const { live, done, loading } = RadioKitDomain.STATUS;

export {
  pickQueriesOfModel,
  pickReadyQueries,
  pickLoadingQueries,
  indexWith,
  indexBy,
  getQueriesContent,
  getEntitiesByIdFromQueries,
  getQueryData,
};

function pickQueriesOfModel(model) {
  return function pickQueriesOfParticularModel(queries) {
    return queries.filter(
      (_, queryParams) => queryParams.get('model') === model
    );
  };
}

function pickReadyQueries(queries) {
  return queries.filter(
    result => (
      result.get('status') === live ||
      result.get('status') === done
    )
  );
}

function pickLoadingQueries(queries) {
  return queries.filter(
    result => (
      result.get('status') === loading
    )
  );
}

function indexWith(func) {
  return function indexWithFunc(collection) {
    return collection
      .groupBy(func)
      .map(entitiesGroupedByField => entitiesGroupedByField.last());
  };
}

function indexBy(field) {
  return indexWith(entity => entity.get(field));
}

function getQueriesContent(queries) {
  return queries
    .map(queryStatus => queryStatus.get('data').toList())
    .toList()
    .flatten(true);
}

function getEntitiesByIdFromQueries(queries) {
  return indexBy('id')(getQueriesContent(queries));
}

function getQueryData(query) {
  return query.get('data', List());
}
