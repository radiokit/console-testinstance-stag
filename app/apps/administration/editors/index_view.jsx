import React from 'react';

import CRUD from '../../../widgets/admin/crud_widget.jsx';

export default React.createClass({
  buildQuery: function() {
    return window.data
      .query("auth", "Editor")
      .select("id", "email")
      .order("email", "asc")
  },


  buildAttributes: function() {
    return {
      email: { renderer: "string" },
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
        validators: {
          presence: true,
        }
      },

      last_name: {
        type: "string",
        validators: {
          presence: true,
        }
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
      <CRUD contentPrefix="apps.administration.editors" queryFunc={this.buildQuery} attributesFunc={this.buildAttributes} formFunc={this.buildForm} />
    );
  }
});
