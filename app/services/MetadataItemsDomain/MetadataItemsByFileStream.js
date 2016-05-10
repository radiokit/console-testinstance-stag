import {
  View,
} from 'immview';
import {
  Map,
  List,
} from 'immutable';
import MetadataSchemasDomain from '../MetadataSchemasDomain';
import MetadataItemsQueriesStream from './MetadataItemsQueriesStream';
import {
  pickReadyQueries,
  getQueriesContent,
} from '../RadioKitQueriesUtils';

/**
 * This stream will push only metadatas of files
 * that has completed queries.
 * However metadataItems bound to those queries scattered across different queries
 * and it is like this because of possible create requests of metadatas
 * that otherwise would not be assigned to file
 */

const MetadataItemsStream = MetadataItemsQueriesStream.map(getQueriesContent);

const UniqueMetadataSchemasStream = MetadataItemsStream.map(
  metadataItems => metadataItems
    .map(entity => entity.get('metadata_schema_id'))
    .toSet()
);

UniqueMetadataSchemasStream.subscribe(
  metadataSchemaIds => metadataSchemaIds.forEach(
    metadataSchemaId => MetadataSchemasDomain.loadMetadataSchema(metadataSchemaId)
  )
);

const MetadataItemsByFileIdStream = MetadataItemsStream.map(
  metadataItems => metadataItems
    .groupBy(metadataItem => metadataItem.get('record_file_id'))
);

const ExtendedMetadataItemsByFileIdStream = new View(
  { MetadataItemsByFileIdStream, MetadataSchemasDomain },
  data => {
    const metadataItemsByFile = data.get('MetadataItemsByFileIdStream');
    const metadataSchemasById = data.getIn(['MetadataSchemasDomain', 'entities']) || Map();

    const extendedMetadataItemsByFileId = metadataItemsByFile
      .map(
        metadataItemsOfFile => {
          let allCanBeExtended = true;
          const extendedMetadataItems = metadataItemsOfFile
            .map(
              entity => {
                const metadataSchema = metadataSchemasById.get(entity.get('metadata_schema_id'));
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
        }
      )
      .filter(v => !!v)
    ;

    return extendedMetadataItemsByFileId;
  });

const ReadyQueriesStream = MetadataItemsQueriesStream.map(pickReadyQueries);

const MetadataItemsByFileStream = new View(
  {
    extendedMetadataItemsByFileId: ExtendedMetadataItemsByFileIdStream,
    readyQueries: ReadyQueriesStream,
  },
  data => {
    const { extendedMetadataItemsByFileId, readyQueries } = data.toObject();

    return readyQueries
      .groupBy(
        (_, queryParams) => queryParams
          .get('conditions')
          .find(i => i.get('field') === 'record_file_id')
          .get('value')
      )
      .map((queries, fileId) => {
        const extendedMetadataItemsOfFile = extendedMetadataItemsByFileId.get(fileId);
        if (extendedMetadataItemsOfFile) {
          return extendedMetadataItemsOfFile;
        }

        const lastQueryData = queries.last().get('data');
        if (lastQueryData.count() === 0) {
          return List();
        }

        return null;
      })
      .filter(v => !!v);
  }
);

export default MetadataItemsByFileStream;
