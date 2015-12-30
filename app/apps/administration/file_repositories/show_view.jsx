import React from 'react';

import Show from '../../../widgets/admin/crud/show_widget.jsx';

import MetadataSchemaPartial from './show_metadata_schema_partial.jsx';
import TagsSchemaPartial from './show_tags_schema_partial.jsx';


export default React.createClass({
  buildTabs: function() {
    return {
      metadata_schema: {
        element: MetadataSchemaPartial, props: {},
      },
      tags_schema: {
        element: TagsSchemaPartial, props: {},
      },
    }
  },


  render: function() {
    return (
      <Show contentPrefix="apps.administration.file_repositories" app="vault" model="Data.Record.Repository" contentElement={this.buildTabs()} />
    );
  }
});
