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
      level: { renderer: "peakmeter", props: { model: "Media.Input.Stream.RTP"} },
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
      <CRUD contentPrefix="apps.infrastructure.transmissions" createEnabled={false} deleteEnabled={false} app="plumber" model="Media.Input.Stream.RTP" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
