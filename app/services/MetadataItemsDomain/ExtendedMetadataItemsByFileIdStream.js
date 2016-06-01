import {
  View,
} from 'immview';
import {
  Map,
} from 'immutable';
import MetadataSchemasDomain from '../MetadataSchemasDomain';
import MetadataItemsQueriesStream from './MetadataItemsQueriesStream';
import {
  getQueriesContent,
} from '../RadioKitQueriesUtils';

const MetadataItemsStream = MetadataItemsQueriesStream.map(getQueriesContent);

const MetadataSchemasOfItemsStream = MetadataItemsStream.map(
  metadataItems => metadataItems
    .map(entity => entity.get('metadata_schema_id'))
    .toSet()
);

MetadataSchemasOfItemsStream.subscribe(
  metadataSchemaIds => metadataSchemaIds.forEach(
    metadataSchemaId =>
      MetadataSchemasDomain.loadMetadataSchema(metadataSchemaId, { noLoadingState: true })
  )
);

const MetadataItemsByFileIdStream = MetadataItemsStream.map(
  metadataItems => metadataItems
    .groupBy(metadataItem => metadataItem.get('record_file_id'))
);

const extendItemsWithSchemas = schemasById => items => {
  let allCanBeExtended = true;
  const extendedMetadataItems = items.map(
    entity => {
      const metadataSchema = schemasById.get(entity.get('metadata_schema_id'));
      if (!metadataSchema) {
        allCanBeExtended = false;
      }
      return entity
        .set('metadata_schema', metadataSchema)
        .remove('metadata_schema_id');
    }
  );
  return allCanBeExtended
    ? extendedMetadataItems
    : null;
};

function leaveEmptyValues(collection) {
  return collection.filter(v => !!v);
}

const ExtendedMetadataItemsByFileIdStream = new View(
  { MetadataItemsByFileIdStream, MetadataSchemasDomain },
  data => {
    const metadataItemsByFile = data.get('MetadataItemsByFileIdStream');
    const metadataSchemasById = data.getIn(['MetadataSchemasDomain', 'entities']) || Map();

    const extendedMetadataItemsByFileId = leaveEmptyValues(
      metadataItemsByFile.map(extendItemsWithSchemas(metadataSchemasById))
    );

    return extendedMetadataItemsByFileId;
  }
);

export default ExtendedMetadataItemsByFileIdStream;
