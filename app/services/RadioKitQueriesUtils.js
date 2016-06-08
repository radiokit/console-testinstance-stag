import {
  List,
} from 'immutable';
import RadioKitDomain from './RadioKitDomain';

const { live, done, loading } = RadioKitDomain.STATUS;

export function pickQueriesOfModel(model) {
  return function pickQueriesOfParticularModel(queries) {
    return queries.filter(
      (_, queryParams) => queryParams.get('model') === model
    );
  };
}

export function pickReadyQueries(queries) {
  return queries.filter(
    result => (
      result.get('status') === live ||
      result.get('status') === done
    )
  );
}

export function pickLoadingQueries(queries) {
  return queries.filter(
    result => (
      result.get('status') === loading
    )
  );
}

export function indexWith(func) {
  return function indexWithFunc(collection) {
    return collection
      .groupBy(func)
      .map(entitiesGroupedByField => entitiesGroupedByField.last());
  };
}

export function indexBy(field) {
  return indexWith(entity => entity.get(field));
}

export function getQueriesContent(queries) {
  return queries
    .map(queryStatus => queryStatus.get('data').toList())
    .toList()
    .flatten(true);
}

export function getEntitiesByIdFromQueries(queries) {
  return indexBy('id')(getQueriesContent(queries));
}

export function getQueryData(query) {
  return query.get('data', List());
}
