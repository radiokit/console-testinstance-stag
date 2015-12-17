import React from 'react';

import CRUD from '../../../widgets/admin/crud_widget.jsx';

export default React.createClass({
  modifyIndexQuery: function(query) {
    return query
      .order("last_name", "asc");
  },


  buildAttributes: function() {
    return {
      first_name: { renderer: "string" },
      last_name: { renderer: "string" },
      email: { renderer: "string" },
      phone: { renderer: "string" },
    }
  },


  buildForm: function() {
    return {
      email: {
        type: "email",
        hint: true,
        validators: {
          presence: true,
        }
      },

      first_name: {
        type: "string",
      },

      last_name: {
        type: "string",
      },

      phone: {
        type: "tel",
      },

      locale: {
        type: "enum",
        values: [ "en", "pl" ],
        validators: {
          presence: true,
        }
      },
    }
  },


  render: function() {
    return (
      <CRUD contentPrefix="apps.administration.editors" app="auth" model="Editor" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
