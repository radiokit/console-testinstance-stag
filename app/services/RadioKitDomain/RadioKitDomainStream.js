import {
  Map,
} from 'immutable';
import {
  View,
} from 'immview';
import RadioKitEntitiesStream from './RadioKitEntitiesStream';

function switchEntitiesInQueries(queries, entities) {
  return queries.map(
    (status, params) => status.set(
      'data',
      status.get('data')
        .map(entity => entities.getIn([
          params.get('app'),
          params.get('model'),
          params.get('id') || entity.get('id'),
        ], null))
        .filter(entity => !!entity)
    )
  );
}

const emptyEntities = Map();
const emptyQueries = Map();

const RadioKitDomainStream = new View(
  RadioKitEntitiesStream,
  data => {
    const entities = data.get('entities', emptyEntities);
    const queries = data.get('queries', emptyQueries);
    return Map({
      queries: switchEntitiesInQueries(queries, entities),
      entities,
    });
  }
);

export default RadioKitDomainStream;

/*

 RadioKitDomainStream: View < Map {
   queries: RadioKitQueries,
   entities: RadioKitEntities,
 } >

 RadioKitQueries: Map < RadioKitQueryKey , RadioKitQueryStatus >

 RadioKitQueryKey: Map{
   app: string,
   model: string,
   id?: string,
   conditions?: List< Map {
     field: string,
     comparison: string,
     value: string
   } >,
   select?: List<string>,
   joins?: List<string>
 }

 RadioKitQueryStatus: Map{
   data: List<RadioKitEntity>,
   time: number,
   status: string,
 }

 RadioKitEntities: Map<string, RadioKitApp>

 RadioKitApp: Map<string, RadioKitModel>

 RadioKitModel: Map<string, RadioKitEntity>

*/
