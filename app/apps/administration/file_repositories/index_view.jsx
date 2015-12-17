import React from 'react';

import CRUD from '../../../widgets/admin/crud_widget.jsx';

export default React.createClass({
  modifyIndexQuery: function(query) {
    return query
      .order("name", "asc")
  },


  buildAttributes: function() {
    return {
      name: { renderer: "string" },
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
    }
  },


  render: function() {
    return (
      <CRUD contentPrefix="apps.administration.file_repositories" app="vault" model="Data.Record.Repository" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
