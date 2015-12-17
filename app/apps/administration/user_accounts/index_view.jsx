import React from 'react';

import CRUD from '../../../widgets/admin/crud_widget.jsx';

export default React.createClass({
  modifyIndexQuery: function(query) {
    return query
      .order("name_custom", "asc");
  },


  buildAttributes: function() {
    return {
      name_custom: { renderer: "string" },
    }
  },


  buildForm: function() {
    return {
      name_custom: {
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
      <CRUD contentPrefix="apps.administration.user_accounts" app="auth" model="User.Account" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
