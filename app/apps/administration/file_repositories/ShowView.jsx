import React from 'react';
import Counterpart from 'counterpart';

import Show from '../../../widgets/admin/crud/show_widget.jsx';
import MetadataSchemaPartial from './ShowMetadataSchemaPartial.jsx';
import ProcessingSchemaPartial from './ShowProcessingSchemaPartial.jsx';
import ImportsSchemaPartial from './ShowImportsSchemaPartial.jsx';
import ExportsSchemaPartial from './ShowExportsSchemaPartial.jsx';
import TagsSchemaPartial from './show_tags_schema_partial';

Counterpart.registerTranslations("en", require('./ShowView.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowView.locale.pl.js'));


const ShowView = React.createClass({

  buildTabs() {
    return {
      metadata_schema: {
        element: MetadataSchemaPartial,
        props: {
          contentPrefix: 'apps.administration.file_repositories.show.tabs.body.metadata_schema',
        },
      },
      tags_schema: {
        element: TagsSchemaPartial,
        props: {
          contentPrefix: 'apps.administration.file_repositories.show.tabs.body.tags_schema',
        },
      },
      processing_schema: {
        element: ProcessingSchemaPartial,
        props: {
          contentPrefix: "apps.administration.file_repositories.show.tabs.body.processing_schema"
        },
      },
      imports_schema: {
        element: ImportsSchemaPartial,
        props: {
          contentPrefix: 'apps.administration.file_repositories.show.tabs.body.imports_schema',
        },
      },
      exports_schema: {
        element: ExportsSchemaPartial,
        props: {
          contentPrefix: 'apps.administration.file_repositories.show.tabs.body.exports_schema',
        },
      },
    };
  },

  render() {
    return (
      <Show
        contentPrefix="apps.administration.file_repositories"
        app="vault"
        model="Data.Record.Repository"
        contentElement={ this.buildTabs() }
      />
    );
  },
});

export default ShowView;
