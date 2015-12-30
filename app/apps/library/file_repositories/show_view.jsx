import React from 'react';

import Show from '../../../widgets/admin/crud/show_widget.jsx';

import SidebarPartial from './show_sidebar_partial.jsx';
import ContentPartial from './show_content_partial.jsx';


export default React.createClass({
  modifyShowQuery: function(query) {
    return query
      .select("metadata_schemas") // metadata_schemas and tag_categories fields are required by the content partial
      .joins("metadata_schemas")
      .select("tag_categories")
      .joins("tag_categories")
  },


  render: function() {
    return (
      <Show contentPrefix="apps.library.file_repositories" app="vault" model="Data.Record.Repository" showQueryFunc={this.modifyShowQuery} sidebarElement={SidebarPartial} contentElement={ContentPartial} deleteEnabled={false} />
    );
  }
});
