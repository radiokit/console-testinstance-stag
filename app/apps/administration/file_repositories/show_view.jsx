import React from 'react';

import Show from '../../../widgets/admin/crud/show_widget.jsx';

import MetadataSchemaPartial from './show_metadata_schema_partial.jsx';


export default React.createClass({
  render: function() {
    return (
      <Show contentPrefix="apps.administration.file_repositories" app="vault" model="Data.Record.Repository" contentElementClass={{metadata_schema: MetadataSchemaPartial}} />
    );
  }
});
