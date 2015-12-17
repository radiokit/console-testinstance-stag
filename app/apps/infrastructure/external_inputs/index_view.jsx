import React from 'react';

import CRUD from '../../../widgets/admin/crud_widget.jsx';

export default React.createClass({
  modifyIndexQuery: function(query) {
    return query
    .where("references", "deq", "role", "infrastructure")
    .order("name", "asc")
  },


  buildAttributes: function() {
    return {
      name: { renderer: "string" },
      location: { renderer: "string" },
      level: { renderer: "peakmeter", props: { model: "Media.Input.Stream.HTTP"} },
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

      location: {
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
      <CRUD contentPrefix="apps.infrastructure.external_inputs" app="plumber" model="Media.Input.Stream.HTTP" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
