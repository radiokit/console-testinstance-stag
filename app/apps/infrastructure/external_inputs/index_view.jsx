import React from 'react';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

export default React.createClass({
  modifyIndexQuery: function(query) {
    return query
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
      <Index contentPrefix="apps.infrastructure.external_inputs" app="plumber" model="Media.Input.Stream.HTTP" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
