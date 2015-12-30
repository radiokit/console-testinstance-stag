import React from 'react';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

export default React.createClass({
  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  modifyIndexQuery: function(query) {
    return query
      .where("references", "deq", "user_account_id", this.context.currentUserAccount.get("id"))
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
      <Index type="list" contentPrefix="apps.library.file_repositories" app="vault" model="Data.Record.Repository" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} createEnabled={false} deleteEnabled={false} />
    );
  }
});
