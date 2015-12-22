import React from 'react';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

export default React.createClass({
  modifyIndexQuery: function(query) {
    return query
      .order("name", "asc")
  },


  buildAttributes: function() {
    return {
      name:             { renderer: "string" },
      files_size_total: { renderer: "filesize" },
      files_count:      { renderer: "integer" },
      user_account:     { renderer: "scope-user-account" },
    }
  },


  buildForm: function() {
    return {
      name: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },
      user_account: {
        type: "scope-user-account",
        validators: {
          presence: true,
        }
      },
    }
  },


  render: function() {
    return (
      <Index contentPrefix="apps.administration.file_repositories" app="vault" model="Data.Record.Repository" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
