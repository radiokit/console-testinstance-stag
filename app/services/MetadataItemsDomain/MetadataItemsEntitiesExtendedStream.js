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

MetadataItemsStream.subscribe(
  metadataItems => metadataItems
    .map(getMetadataItemSchemaId)
    .toSet()
    .forEach(loadMetadataSchema)
);

const MetadataItemsByFileIdStream = MetadataItemsStream.map(
  metadataItems =>
    metadataItems.groupBy(getMetadataItemFileId)
);

const MetadataItemsEntitiesExtendedStream = new View(
  {
    MetadataItemsByFileIdStream,
    MetadataSchemasDomain,
  },
  data => {
    const metadataItemsByFile = data.get('MetadataItemsByFileIdStream');
    const metadataSchemasById = data.getIn(['MetadataSchemasDomain', 'entities']) || Map();

    const extendedMetadataItemsByFileId = leaveEmptyValues(
      metadataItemsByFile.map(items => extendAllItemsWithAllSchemas(metadataSchemasById, items))
    );

    return extendedMetadataItemsByFileId;
  }
);

export default MetadataItemsEntitiesExtendedStream;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function loadMetadataSchema(metadataSchemaId) {
  return MetadataSchemasDomain.loadMetadataSchema(metadataSchemaId, { noLoadingState: true });
}

function getMetadataItemFileId(metadataItem) {
  return metadataItem.get('record_file_id');
}

function getMetadataItemSchemaId(metadataItem) {
  return metadataItem.get('metadata_schema_id');
}

function extendAllItemsWithAllSchemas(schemasById, items) {
  let allMetadataItemsOfFileCanBeExtended = true;
  const extendedMetadataItems = items.map(
    entity => {
      const metadataSchema = schemasById.get(entity.get('metadata_schema_id'));
      if (!metadataSchema) {
        allMetadataItemsOfFileCanBeExtended = false;
      }
      return entity
        .set('metadata_schema', metadataSchema)
        .remove('metadata_schema_id');
    }
  );
  return allMetadataItemsOfFileCanBeExtended
    ? extendedMetadataItems
    : null;
}

function leaveEmptyValues(collection) {
  return collection.filter(v => !!v);
}
