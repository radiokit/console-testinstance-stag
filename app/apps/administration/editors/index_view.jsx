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


  render: function() {
    return (
      <CRUD contentPrefix="apps.administration.editors" queryFunc={this.buildQuery} attributesFunc={this.buildAttributes} />
    );
  }
});
